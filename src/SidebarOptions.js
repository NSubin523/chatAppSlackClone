import React from 'react'
import styled from "styled-components";
import {db} from "./Firebase";
import {useDispatch} from "react-redux";
import {enterRoom} from "./features/appSlice";

function SidebarOptions({Icon, title, addServer, id}) {

    const dispatch = useDispatch();

    const addServerOption = () =>{
        const serverName = prompt('Please enter the server name');
        if(serverName){
            db.collection("room").add(
                {
                    name : serverName,
                }
            );
        }
    }

    const selectServer = () =>{
        if(id){
            dispatch(enterRoom({
                roomId: id
            }))
        }
    }

    return (
       <SidebarOptionsContainer
       onClick={addServer ? addServerOption : selectServer}
       >
           {Icon && <Icon fontSize='small' style={{padding: 10}}/>}
           {Icon ? (
               <h3>{title}</h3>
           ) : (
               <SideBarOptionChannel>
                   <span>#</span> {title}
               </SideBarOptionChannel>
           )
        }
       </SidebarOptionsContainer>
    )
}

export default SidebarOptions

const SidebarOptionsContainer = styled.div `
    display: flex;
    font-size: 14px;
    align-items: center;
    padding-left: 2px;
    cursor: pointer;
    :hover{
        opacity: 0.8;
        background-color: #C0C0C0;
    }
    >h3{
        font-weight: 500;
        > span{
            padding: 15px;
        }
    }
`;

const SideBarOptionChannel = styled.h3 `
    padding: 10px 0;
    font-weight: 300;

`;