export interface iTextInput {
    line?: any;
    border?: any;
    type?: any;
    onChangeDate?: any;
    error?: boolean | string;
    leftIcon?: string;
    placeholder?: string;
    enterKeyHint?: string;
    onChangeText?: (text: string) => void;
    onSubmitEditing?: any;
    keyboardType?: string;
    secureTextEntry?: boolean;
    ispassword?: boolean;
    rightIcon?: string;
    rightIconPress?: any,
    multiline?: boolean,
    value: any,
}

// export interface iTextInput {
//     line?: boolean;
//     border?: boolean;
//     type?: string;
//     onChangeDate?: (date: Date) => void;
//     error?: boolean | string;
//     leftIcon?: string;
//     placeholder?: string;
//     enterKeyHint?: string;
//     onChangeText?: (text: string) => void;
//     onSubmitEditing?: () => void;
//     keyboardType?: string;
//     secureTextEntry?: boolean;
//     ispassword?: boolean;
//     rightIcon?: string;
//   }