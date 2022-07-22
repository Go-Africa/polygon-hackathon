export class Phone {
    countryCode: string;
    dialCode: string;
    e164Number: string;
    internationalNumber: string
    nationalNumber: string;
    number: string;

    constructor(c_code: string, d_code: string, e_num: string, i_num: string, nat_num: string, num: string) {
        this.countryCode = c_code;
        this.dialCode = d_code;
        this.e164Number = e_num;
        this.internationalNumber = i_num;
        this.nationalNumber = nat_num;
        this.number = num;
    }
}