
function fancyStatusTranslator(st)
{
    let fancyStatus = "";
    switch(st){
        case "reservation":
            fancyStatus="Reservation"
        break;
        case "accepted_reservation":
            fancyStatus="Accepted Reservation"
        break;
        case "your_turn":
            fancyStatus="Your Turn"
        break;
        case "dates_chosen":
            fancyStatus="Dates Chosen"
        break;
        case "dates_rejected":
            fancyStatus="Dates Rejected"
        break;
        case "accepted_date":
            fancyStatus="Accepted Date"
        break;
        case "passed_down":
            fancyStatus="Passed Down"
        break;
        case "lent":
            fancyStatus="Lent"
        break;
        case "returned":
            fancyStatus="Returned"
        break;
        case "cancelled":
            fancyStatus="Cancelled"
        break;
        case "successfully_finished":
            fancyStatus="Successfully Finished"
        break;
        case "unsuccessfully_finished":
            fancyStatus="Unsuccessfully Finished"
        break;
    }
    return fancyStatus;
}

export default fancyStatusTranslator;