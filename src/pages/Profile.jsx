import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProfilePage(){
    const user = useContext(AuthContext);
    return(<p>This is where the magic will happen</p>)
}