import { Card, Nav } from "react-bootstrap";
import './InviteNow.scss';
import { arrowBack, wrappedGift } from "../assets/images";
import { ReactComponent as ArrowFront } from '../assets/images/arrow-back.svg';

const InviteNow = () => {
    return (
        <>
        <div className='invitation'>
            <Card>
                <Card.Header>Invite your friends</Card.Header>
                <Card.Body className='d-flex justify-content-between'>
                    <p>Enroll for as many techfit courses as you like for free</p>
                    <img src={wrappedGift}></img>
                </Card.Body>
                <Card.Footer><Nav.Link>Invite Now <ArrowFront /></Nav.Link></Card.Footer>
            </Card>
        </div>
    </>
    )
}

export default InviteNow;