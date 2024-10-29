export default class Utils {
    static isNull(value: any) {
        return value === "" || value === undefined;
    }

    static isEmailValid(email:any) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(email);
      }
    
      static isPasswordValid(password:any) {
        return password.length >= 6;
      }
    
      static isPhoneNumberValid(phoneNumber:any) {
        return phoneNumber.length >= 10;
      }
}