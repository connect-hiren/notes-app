import moment from 'moment';
import SQLite from 'react-native-sqlite-storage';

import { CREATED_AT, CURRENT_TIMESTAMP, DATE_TODO, ID, IS_DELETE, 
    IS_PIN, NOTES, TABLE_NOTES, TABLE_TODO, TODOS, UPDATED_AT } from './constants';

const openDB = () => {
    return SQLite.openDatabase("mydatabase.db", "1.0", "mytodos", 200000, () => { }, () => { });
}

export const createTable = async (callback = async () => { }) => {

    const db = await SQLite.openDatabase("mydatabase.db", "1.0", "mytodos", 200000, () => { }, () => { })

    const query = `
    CREATE TABLE IF NOT EXISTS ${TABLE_NOTES} (
        ${ID} INTEGER PRIMARY KEY AUTOINCREMENT,
        ${NOTES} TEXT,
        ${IS_DELETE} BOOLEAN DEFAULT FALSE,
        ${IS_PIN} BOOLEAN DEFAULT FALSE,
        ${CREATED_AT} TIMESTAMP DEFAULT ${CURRENT_TIMESTAMP},
        ${UPDATED_AT} TIMESTAMP DEFAULT ${CURRENT_TIMESTAMP}
        );`;

    const query2 = `
        CREATE TABLE IF NOT EXISTS ${TABLE_TODO} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ${TODOS} TEXT NOT NULL,
            ${DATE_TODO} DATE,
            ${IS_DELETE} BOOLEAN DEFAULT FALSE,
            ${IS_PIN} BOOLEAN DEFAULT FALSE,
            ${CREATED_AT} TIMESTAMP DEFAULT ${CURRENT_TIMESTAMP},
            ${UPDATED_AT} TIMESTAMP DEFAULT ${CURRENT_TIMESTAMP}
            );`;

    db.transaction(tx => {
        tx.executeSql(query, [],
            (tx, results) => {
                tx.executeSql(query2, [], (tx, results) => { callback(true) })
            },
            (tx, error) => {
                callback(false)

            }, (error) => {
                console.log("Errorrr --- ", error);
            }
        );
    });
};

export const getNotesData = async (callback) => {

    const db = openDB()
    const query = `SELECT * FROM ${TABLE_NOTES} where ${IS_DELETE}=0 order by ${IS_PIN} desc, ${UPDATED_AT} desc`;
    try {
        var results = await new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(query, [],
                    (tx, results) => {
                        let len = results.rows.length;
                        const notes = [];
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            notes.push(row)
                        }
                        callback(notes)
                        resolve(results);
                    },
                    (tx, error) => {reject(error)}
                );
            });
        });
    } catch (error) {
        console.error('Error getting data:', error);
    }
};

export const getTodosData = async (date, callback) => {
    const db = openDB()

    let dateTD = date ? date : moment(new Date()).format("DD-MM-YYYY");
    const query = `SELECT * FROM ${TABLE_TODO} where ${IS_DELETE}=0 AND ${DATE_TODO}='${dateTD}' order by ${IS_PIN}, ${UPDATED_AT} desc`;
    
    try {
        var results = await new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(query, [],
                    (tx, results) => {
                        let len = results.rows.length;

                        const todos = [];
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            todos.push(row)
                        }
                        callback(todos)
                        resolve(results);
                    },
                    (tx, error) => {reject(error)}
                );
            });
        });
    } catch (error) {
        console.error('Error getting data:', error);
    }
};

export const addNote = async ({ note, id }, callback) => {

    const db = await openDB();
    const query = id === 0 ?
        `INSERT INTO ${TABLE_NOTES} (${NOTES}) VALUES ('${note}');`
        :
        `UPDATE ${TABLE_NOTES} SET ${NOTES}='${note}' WHERE ${ID}=${id};`;

    db.transaction(tx => {
        tx.executeSql(query, [],
            (tx, results) => { callback(true) },
            (tx, error) => { console.error('Error inserting data:', error) }
        );
    });
};

export const addTodo = async (props, callback) => {

    const { id, frDate, todo } = props

    const db = await openDB();
    const query = id === 0 ?
        `INSERT INTO ${TABLE_TODO} (${TODOS},${DATE_TODO}) VALUES ('${todo}','${frDate}');`
        :
        `UPDATE ${TABLE_TODO} SET ${TODOS}='${todo}' WHERE ${ID}=${id};`;

    db.transaction(tx => {
        tx.executeSql(query, [],
            (tx, results) => {callback(true)},
            (tx, error) => {console.error('Error inserting data ------- :', error)}
        );
    });

}

export const setPinToNote = async (id, pin, callback) => {
    const db = await openDB();
    const query = `UPDATE ${TABLE_NOTES} SET ${IS_PIN}=${pin} WHERE ${ID}=${id};`;

    db.transaction(tx => {
        tx.executeSql(query, [],
            (tx, results) => { callback(true) },
            (tx, error) => { console.error('Error inserting data:', error) }
        );
    });
}

export const setPinToTodos = async (id, pin, callback) => {
    const db = await openDB();
    const query = `UPDATE ${TABLE_TODO} SET ${IS_PIN}=${pin} WHERE ${ID}=${id};`;

    db.transaction(tx => {
        tx.executeSql(query, [],
            (tx, results) => { callback(true) },
            (tx, error) => { console.error('Error inserting data:', error) }
        );
    });
}

export const deleteNote = async (id, callback) => {
    const db = await openDB();
    const query = `UPDATE ${TABLE_NOTES} SET ${IS_DELETE}=1, ${UPDATED_AT}=${CURRENT_TIMESTAMP} WHERE ${ID}=${id};`;

    db.transaction(tx => {
        tx.executeSql(query, [],
            (tx, results) => { callback(true) },
            (tx, error) => { console.error('Error inserting data:', error) });
    });
}

export const deleteTodo = async (id, callback) => {
    const db = await openDB();
    const query = `UPDATE ${TABLE_TODO} SET ${IS_DELETE}=1, ${UPDATED_AT}=${CURRENT_TIMESTAMP} WHERE ${ID}=${id};`;

    db.transaction(tx => {
        tx.executeSql(query, [],
            (tx, results) => { callback(true) },
            (tx, error) => { console.error('Error inserting data:', error) }
        );
    });
}

export const changeDate = async (props, callback) => {
    const { currentId, frDate } = props
    const db = await openDB();
    const query = `UPDATE ${TABLE_TODO} SET ${DATE_TODO}='${frDate}' WHERE ${ID}=${currentId};`;

    db.transaction(tx => {
        tx.executeSql(query, [],
            (tx, results) => { callback(true) },
            (tx, error) => { console.error('Error inserting data ------- :', error) }
        );
    });
}