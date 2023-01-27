import { Card, Nav } from "react-bootstrap";
import './InviteNow.scss';
import { arrowBack, wrappedGift } from "../assets/images";

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
                <Card.Footer>
                    <Nav.Link>Invite Now 
                    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 11H7.14l3.63-4.36a1.001 1.001 0 0 0-1.54-1.28l-5 6a1.184 1.184 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13.026.052.056.103.09.15l5 6a1 1 0 0 0 1.54-1.28L7.14 13H19a1 1 0 0 0 0-2Z" fill="#8F8799"></path></svg>
                    </Nav.Link>
                </Card.Footer>
            </Card>
        </div>
    </>
    )
}

export default InviteNow;