import { Badge } from 'react-bootstrap';
import '../styles/Badge.css'


let BadgeStatus = (statusObj) =>  {
    let status = Object.values(statusObj);
    let statusString = status.toString();
    console.log(statusString)

    switch (statusString) {
        case "Prospect":
            return (
                <Badge className="badge-prospect" bg="">Prospect</Badge>

            );
        case 'Applied':
            return (
                <Badge className="badge-applied" bg="">Applied</Badge>
            );
        case 'Phone Screen':
            return (
                <Badge className="badge-phonescreen" bg="">Phone Screen</Badge>
            );
        case 'Online Assessment':
            return (
                <Badge className="badge-oa" bg="">Online Assessment</Badge>
            );
        case 'Interview: Phone':
            return (
                <Badge className="badge-int" bg="">Interview: Phone</Badge>
            );
        case 'Interview: Virtual':
            return (
                <Badge className="badge-int" bg="">Interview: Virtual</Badge>
            );
        case 'Interview: In-office':
            return (
                <Badge className="badge-int" bg="">Interview: In-office</Badge>
            );
        case 'Negotiating Offer':
            return (
                <Badge className="badge-negotiating" bg="">Negotiating Offer</Badge>
            );
        case 'Rejection':
            return (
                <Badge className="badge-reject" bg="">Rejection</Badge>
            );
        case 'Closed':
            return (
                <Badge className="badge-closed" bg="">Closed</Badge>
            );
        case 'Offer':
            return (
                <Badge className="badge-offer" bg="">Offer</Badge>
            );
        default:
            return (
                <Badge className=""></Badge>
            )

    }

  }


export default BadgeStatus;