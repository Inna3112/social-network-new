import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/Post/MyPostsContainer";
import {ProfileType} from "../../redux/profile-reducer";

type PropsType = {
    profile: ProfileType
}


const Profile = (props: PropsType) => {
    return (
        <div>
            <ProfileInfo profile={props.profile} />
            <MyPostsContainer/>
        </div>

    )
}

export default Profile;