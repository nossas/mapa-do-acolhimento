import React from "react";
import styled from "styled-components";
import { Button } from "bonde-styleguide";
import { useStoreState, useStoreActions } from "easy-peasy";

import { getUserData } from "../services/utils";

const BtnWarning = styled(Button)`
  border-color: ${props => (props.disabled ? "unset" : "#EE0090")}
  color: ${props => (props.disabled ? "#fff" : "#EE0090")}
`;

const Foward = ({ id }: { id: number }) => {
  const setIndividual = useStoreActions(
    (actions: { individual }) => actions.individual.setIndividual
  );
  const setStatus = useStoreActions(
    (actions: { status }) => actions.status.setStatus
  );
  const tableData = useStoreState(state => state.table.data);
  const volunteer = useStoreState(state => state.match.volunteer);

  const onClick = () => {
    // TODO: Tratar caso em que a usuária não tem user_id
    const user = getUserData({
      user: id,
      data: tableData,
      filterBy: "user_id"
    });
    setIndividual(user);
    setStatus("confirm");
  };

  return (
    <BtnWarning light onClick={onClick} disabled={volunteer.email === ""}>
      Encaminhar
    </BtnWarning>
  );
};

export default Foward;
