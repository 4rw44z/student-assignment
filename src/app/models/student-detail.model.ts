export class Students {
    id?: string;
    name: string;
    email: string;
    mobile: number;
    dob: string;
    gender: string;
    address: IStudentAddress;
    constructor(student: any = {}) {
        this.name = student.name;
        this.email = student.email;
        this.mobile = student.mobile;
        this.dob = student.dob;
        this.gender = student.gender;
        this.address = student.address;
    }
}
export interface IStudentAddress {
    address: string;
    additional: string;
    pinCode: number;
    city: string;
    state: string;
}