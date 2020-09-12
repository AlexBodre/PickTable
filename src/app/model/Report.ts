import {User} from "./User";
export class Report {
    id: string;
    description: string;
    report_type: string;
    imageURL: string;
    imageFileName: string;
    address: string;
    date: string;
    status: string;
    reporter_data: User;

}