export class OvertimeShift {
    public id: number;
    public shiftDate: Date;
    public shiftStartTime: string;
    public shiftEndTime: string;
    public department: string;
    public coveredBy: string;
    


    constructor(){
        this.shiftStartTime = '';
        this.shiftEndTime = '';
        this.department = '';
        this.coveredBy= '';
    }
}