import { Alert, Snackbar } from "@mui/material"

export const SnackBar=({snackBarData,setData})=>{

let {vertical, horizontal,msg,show,type}=snackBarData

function closeSnackbar(){
    setData({ ...snackBarData, show: false });
}

    return(
        <Snackbar
        sx={{zIndex:"999999999999999999"}}
        anchorOrigin={{vertical, horizontal }}
        autoHideDuration={3000}
        open={show}
        key={vertical + horizontal}
        onClose={closeSnackbar}
      >
        <Alert
          severity={type}
          sx={{ width: "100%" }}
          onClose={closeSnackbar}
        >
          {msg}
        </Alert>
      </Snackbar>
    )
}