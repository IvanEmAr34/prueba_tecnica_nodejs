"use client";
import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip,
  Paper,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import userService from "@/app/services/userService";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const USER_TYPES = ["admin", "reader", "creator"];

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const styles = {
  title: {
    textAlign: "center",
    fontSize: "xx-large",
    fontWeight: "bold",
  },
  formContainer: {
    margin: "10px",
    padding: "10px",
  },
};

const saveUser = (payload) => {
  if (payload["_id"]) {
    return userService.updateUser(payload["_id"], payload);
  } else {
    return userService.addUser(payload);
  }
};

const EditUser = ({ userId, closeModal }) => {
  const [userInfo, setUserInfo] = useState({
    _id: null,
    roles: [],
    name: "",
    userName: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const [componentState, setComponentState] = useState({
    isOpenMessage: false,
    message: "",
  });

  useEffect(() => {
    if (!userId) {
      return;
    }
    userService
      .getUser(userId)
      .then((response) => {
        const { email, name, password, roles, userName, _id } = response;

        console.log("gerUser: ", response);
        setUserInfo({
          email,
          name,
          password,
          roles,
          userName,
          _id,
          confirmPassword: password,
        });
      })
      .catch((err) => {
        setComponentState({
          isOpenMessage: true,
          type: "error",
          message: "error reading user",
        });
      });
  }, [userId]);

  const changeInput = (e, name) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: e.target.value,
    }));
  };

  const submitUser = () => {
    let newComponentState = {
      validateInputs: true,
      isOpenMessage: false,
      type: "",
      message: "",
    };
    const isValidForm = userService.validatePayload(userInfo);
    if (!isValidForm) {
      newComponentState = {
        ...newComponentState,
        isOpenMessage: true,
        type: "error",
        message: "invalid form",
      };
      setComponentState(newComponentState);
      return;
    }
    newComponentState.saving = true;
    setComponentState(newComponentState);

    saveUser(userInfo)
      .then((response) => {
        let savedSuccessfully = false;
        if (response.errorResponse) {
          newComponentState.type = "error";
          newComponentState.message = response.errorResponse.errmsg;
        } else {
          newComponentState.type = "success";
          newComponentState.message = "success";
          savedSuccessfully = true;
        }
        setComponentState(newComponentState);
        savedSuccessfully && closeModal(true);
      })
      .catch((error) => {
        console.error(error);
        newComponentState.type = "error";
        newComponentState.message = "error";
        setComponentState(newComponentState);
      });
  };

  const handleClose = () => {
    setComponentState((prev) => ({
      ...prev,
      isOpenMessage: false,
      message: "",
      type: "",
    }));
  };

  return (
    <>
      <Paper elevation={5} style={styles.formContainer}>
        <h2 style={styles.title}>
          {!userId && "Nuevo usuario"}
          {userId && "Editando usuario"}
        </h2>
        <Box component="form" autoComplete="off">
          <Grid container>
            <Grid item xs={12}>
              <FormControl sx={{ mb: 1, width: "100%" }}>
                <TextField
                  required
                  id="outlined-required"
                  label="Nombre"
                  defaultValue={userInfo.name}
                  onChange={(e) => changeInput(e, "name")}
                  error={
                    componentState.validateInputs &&
                    (!userInfo.name || userInfo.name === "")
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ mb: 1, width: "100%" }}>
                <TextField
                  required
                  id="outlined-required"
                  label="Nombre de usuario"
                  defaultValue={userInfo.userName}
                  onChange={(e) => changeInput(e, "userName")}
                  error={
                    componentState.validateInputs &&
                    (!userInfo.userName || userInfo.userName === "")
                  }
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl sx={{ mb: 1, width: "100%" }}>
                <TextField
                  required
                  id="outlined-required"
                  label="Contraseña"
                  type="password"
                  defaultValue={userInfo.password}
                  onChange={(e) => changeInput(e, "password")}
                  error={
                    componentState.validateInputs &&
                    (!userInfo.password || userInfo.password === "")
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ mb: 1, width: "100%" }}>
                <TextField
                  required
                  id="outlined-required"
                  label="Confirmar contraseña"
                  type="password"
                  defaultValue={userInfo.confirmPassword}
                  onChange={(e) => changeInput(e, "confirmPassword")}
                  error={
                    componentState.validateInputs &&
                    (!userInfo.name ||
                      userInfo.name === "" ||
                      userInfo.confirmPassword !== userInfo.password)
                  }
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl sx={{ mb: 1, width: "100%" }}>
                <TextField
                  required
                  id="outlined-required"
                  label="Correo"
                  type="email"
                  defaultValue={userInfo.email}
                  onChange={(e) => changeInput(e, "email")}
                  error={
                    componentState.validateInputs &&
                    (!userInfo.email || userInfo.email === "")
                  }
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl sx={{ mb: 1, width: "100%" }}>
                <InputLabel id="demo-multiple-chip-label">
                  Roles del usuario *
                </InputLabel>
                <Select
                  required
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={userInfo.roles ?? []}
                  onChange={(e) => changeInput(e, "roles")}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                  error={
                    componentState.validateInputs &&
                    (!userInfo.roles || userInfo.roles.length < 1)
                  }
                >
                  {USER_TYPES.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={12}>
              <Box style={{ display: "grid" }}>
                <Button
                  variant="contained"
                  endIcon={<SaveIcon />}
                  style={{ marginLeft: "auto" }}
                  onClick={submitUser}
                  disabled={componentState.saving}
                >
                  Guardar usuario
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Snackbar
        open={componentState.isOpenMessage}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={componentState.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {componentState.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditUser;
