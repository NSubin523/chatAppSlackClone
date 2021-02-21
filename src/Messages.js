import React, { useRef,useEffect } from 'react'
import styled from "styled-components";
import StartBorderOutline from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { useSelector } from 'react-redux';
import SendMessage from "./SendMessages";
import {selectRoomId} from "./features/appSlice";
import {useCollection,useDocument} from "react-firebase-hooks/firestore";
import {db} from "./Firebase";
import ChatMsg from "./ChatMsg";

function Messages() {

    const roomId = useSelector(selectRoomId);
    const[roomDetails] = useDocument(
        roomId && db.collection("room").doc(roomId)
    )

    const [roomMessage, loading] = useCollection(
        roomId && db.collection("room").doc(roomId).collection('messages').orderBy("timestamp","asc")
    )

    const chatRef = useRef(null);
    useEffect(() =>{
        chatRef?.current?.scrollIntoView({
            behavior: "smooth"
        });
    },[roomId,loading]);

    return (
        <ChatContainer>
            {roomDetails && roomMessage && (
                <>
           <Header>
                <LeftComponent>
                    <h4><strong>#{roomDetails?.data().name}</strong>
                    <StartBorderOutline/>
                    </h4>
                </LeftComponent>

                <RightComponent>
                    <p><InfoOutlinedIcon/> Details </p>
                </RightComponent>
           </Header>
           <ChatMessages>
                {roomMessage?.docs.map(doc =>{
                    const{message,timestamp,user,userImage} =doc.data();
                    return (
                        <ChatMsg
                            key={doc.id}
                            message={message}
                            timestamp={timestamp}
                            user={user}
                            userImage={userImage}
                        />
                    )
                })}

                <AutoBtm ref={chatRef} />
           </ChatMessages>
           <SendMessage
                chatRef={chatRef}
                channelName={roomDetails?.data().name}
                channelId={roomId}
           />
           </>
            )}

        </ChatContainer>
    );
}

export default Messages

const ChatMessages = styled.div`

`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid gray;
`;

const RightComponent = styled.div`
    >p{
        display:flex;
        align-items:center;
        font-size: 14px;
    }
`;

const LeftComponent = styled.div`

    display: flex;
    align-items:center;

    >h4{
        display:flex;
        text-transform: lowercase;
        >.MuiSvgIcon{
            margin-left: 10px;
            font-size: 18px;
            margin-right: 10px;
        }
    }
`;

const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top: 60px;
`;

const AutoBtm = styled.div`
    padding: 50px;
`;