import React, { useEffect } from "react";
import { Divider, List } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import ListAltIcon from "@material-ui/icons/ListAlt";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import { useSelector, useDispatch } from "react-redux";
import { getLists } from "../../actions/lists";
import ShowHide from "../auth/ShowHide";
import DrawerItem from "./DrawerItem";

const DrawerItems = ({ handleListItemClick, classes }) => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getLists());
    }
  }, [isLoggedIn, dispatch]);

  const myLists = lists.map((list) => {
    const { _id, name } = list;
    return (
      <DrawerItem
        key={_id}
        name={name}
        Icon={ListAltIcon}
        to={`/list/${_id}`}
        onClick={handleListItemClick}
      />
    );
  });

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List disablePadding={true}>
        <DrawerItem
          name="Home"
          to="/"
          Icon={HomeIcon}
          onClick={handleListItemClick}
        />
        <ShowHide isShowValue={isLoggedIn}>
          <DrawerItem
            name="New List"
            to="/list/create"
            Icon={AddBoxOutlinedIcon}
            onClick={handleListItemClick}
          />
          {myLists}
        </ShowHide>
      </List>
    </div>
  );
};

export default DrawerItems;
