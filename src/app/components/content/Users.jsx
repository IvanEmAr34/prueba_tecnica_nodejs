"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Button,
  Typography,
  IconButton,
  Modal
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import userService from "@/app/services/userService";
import EditIcon from "@mui/icons-material/Edit";
import Table from "../globals/Table";
import EditUser from "./users/EditUser";

const styles = {
  title: {
    textAlign: "center",
    fontSize: "xx-large",
    fontWeight: "bold",
  },
  modalBody: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 0,
  },
};

const Users = (props) => {
  const [editUserModal, setEditUserModal] = useState({
    userId: null,
    isOpen: false,
  });
  const [refreshList, setRefreshList] = useState(0);
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    userService
      .getUsers()
      .then((response) => {
        response && setUsers(response);
      })
      .finally(() => setIsLoading(false));
  }, [refreshList]);

  const handleOpen = (userId) =>
    setEditUserModal((prevEditUserModal) => ({
      ...prevEditUserModal,
      userId,
      isOpen: true,
    }));
  const handleClose = (refreshTable = false) => {
    setEditUserModal((prevEditUserModal) => ({
      ...prevEditUserModal,
      userId: null,
      isOpen: false,
    }));
    refreshTable && setRefreshList((prev) => prev + 1);
  };
  const getColumns = () => {
    return [
      {
        value: "name",
        label: "Nombre",
      },
      {
        value: "userName",
        label: "Nombre de usuario",
      },
      {
        value: "email",
        label: "Email",
      },
      {
        value: "roles",
        label: "Roles",
      },
      {
        value: "action",
        label: "Acciones",
      },
    ];
  };
  const getUsers = () => {
    let newUsers = (users ?? []).map(({ roles, ...user }, idx) => ({
      ...user,
      roles: roles.join(", "),
      action: (
        <IconButton
          key={`${idx}-button-edit`}
          onClick={() => handleOpen(user["_id"])}
        >
          <EditIcon />
        </IconButton>
      ),
    }));
    return newUsers;
  };

  return (
    <>
      <h2 style={styles.title}>Usuarios</h2>
      <Button
        onClick={(e) => handleOpen()}
        className="float-right"
        startIcon={<AddIcon />}
      >
        Nuevo usuario
      </Button>
      {isLoading && (
        <Box className="text-center mt-10">
          <CircularProgress />
        </Box>
      )}
      {users && !isLoading && (
        <Table
          columns={getColumns()}
          rows={getUsers()}
          callbackFunction={handleOpen}
        />
      )}
      <Modal
        open={editUserModal.isOpen}
        onClose={handleClose}
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.modalBody}>
          <IconButton aria-label="" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <EditUser userId={editUserModal.userId} closeModal={handleClose} />
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Users;
