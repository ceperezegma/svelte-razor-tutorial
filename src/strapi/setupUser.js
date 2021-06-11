import {setStorageUser, setUser} from '../stores/user';

function setupUser(respose){
    const {jwt} = respose.data;
    const {username} = respose.data.user;
    const user = {username, jwt};
    setStorageUser(user);
    setUser(user);
}

export default setupUser;