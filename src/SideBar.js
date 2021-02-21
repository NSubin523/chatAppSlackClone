import React from 'react'
import styled from "styled-components";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import SidebarOption from "./SidebarOptions";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import {useCollection} from "react-firebase-hooks/firestore";
import {auth, db} from "./Firebase";
import { useAuthState } from 'react-firebase-hooks/auth';

function SideBar() {
    const[servers,loading,error] = useCollection(db.collection("room"));
    const[user] = useAuthState(auth);
    return (
        <SideBarContainer>
            <UserName>
                <UserInfo>
                    <h2> Chat App React JS </h2>
                    <h3> <FiberManualRecordIcon/> {user.displayName} </h3>
                </UserInfo>
                <CreateIcon/>
            </UserName>
            <SidebarOption Icon={InsertCommentIcon} title="Threads"/>
            <SidebarOption Icon={InboxIcon} title="Mentions"/>
            <SidebarOption Icon={DraftsIcon} title="Drafts"/>
            <SidebarOption Icon={BookmarkBorderIcon} title="Channel Browser"/>
            <SidebarOption Icon={PeopleAltIcon} title="People & User Groups"/>
            <SidebarOption Icon={AppsIcon} title="Apps"/>
            <SidebarOption Icon={FileCopyIcon} title="File Browser"/>
            <SidebarOption Icon={ExpandLessIcon} title="Show less"/>

            <hr/>

            <SidebarOption Icon={ExpandMoreIcon} title="Servers"/>

            <hr/>

            <SidebarOption Icon={AddIcon} addServer title="Add Servers"/>
            {servers?.docs.map(doc => (
                <SidebarOption key={doc.id} id={doc.id} title={doc.data().name}/>
            ))}
        </SideBarContainer>
    )
}

export default SideBar

const SideBarContainer = styled.div `
    background-color: #00000c;
    flex: 0.3;
    color: white;
    border-top: 1px solid #49274b;
    max-width: 260px;
    margin-top: 60px;   
    
    > hr{
        background-color: whitesmoke;
        margin-top: 10px;
        margin-bottom: 10px;
    }
`;

const UserName = styled.div `   
    display: flex;
    border-bottom: 1px solid whitesmoke;
    padding-bottom: 10px;
    padding: 13px;

    > .MuiSvgIcon-root{
        padding: 8px;
        color: #49274b;
        font-size: 18px;
        background-color: white;
        border-radius: 999px;
    }
`;

const UserInfo = styled.div `
    flex: 1;
    > h2{
        font-size: 15px;
        font-weight: 900;
        margin-bottom: 5px;
    }
    > h3{
        display: flex;
        font-size: 13px;
        font-weight: 400;
        align-items: center;
        >.MuiSvgIcon-root{
            font-size: 14px;
            margin-top: 1px;
            margin-right: 2px;
            color: green;
        }
    }
`;