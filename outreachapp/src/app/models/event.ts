export interface Event {
    _id: string;
    benName: string;
    baseLocation: string;
    council: string;
    address: string;
    pocID: string;
    pocDet: string;
    project: string;
    eventCat: string;
    eventTitle: string;
    eventDesc: string;
    numberOfVol: number;
    transMod: string;
    boardingPtDet: string;
    droppingPtDet: string;
    startDt: Date;
    endDt: Date;
    visibleDt: Date;
    isFavorite: boolean;
    createdBy: string;
    createdDt: Date;
    updatedBy: string;
    updatedDt: Date;
}