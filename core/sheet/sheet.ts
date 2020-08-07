'use strict';

import hasChat from "./methods/hasChat";
import createNewChat from "./methods/createNewChat";
import deleteChat from "./methods/deleteChat";

class sheet {

    public hasChat = hasChat;
    public createNewChat = createNewChat;
    public deleteChat = deleteChat;

}


export default new sheet();
