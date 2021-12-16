#!/usr/bin/env node
import jobStatuses from "./components/User/jobStatuses";

jobStatuses('16e8ac447f40a0ab038461d5278e877f')
    .then((result) => {
        console.log(result);
    });