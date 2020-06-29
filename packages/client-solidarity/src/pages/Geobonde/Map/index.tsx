import React, { useEffect, useState } from "react";
import MapGL, { Popup } from "react-map-gl";
import { useStoreState, useStoreActions } from "easy-peasy";

import request from "../../../services/request";

import UserInfo from "./UserInfo";
import Pins from "./Pins";

interface Viewport {
  latitude: number;
  longitude: number;
  zoom: number;
  bearing: number;
  pitch: number;
}

const Map = () => {
  const popupUser = useStoreState(state => state.map.popupUser);
  const tableData = useStoreState(state => state.table.data);

  const setTableData = useStoreActions(
    (actions: { table }) => actions.table.setTable
  );
  const setPopupUser = useStoreActions(
    (actions: { map }) => actions.map.setPopupUser
  );

  const [viewport, setViewport] = useState<Viewport>({
    latitude: -13.7056555,
    longitude: -69.6490712,
    zoom: 3.5,
    bearing: 0,
    pitch: 0
  });

  useEffect(() => {
    (async () => {
      const response = await request.get("locations");
      setTableData(response.data);
    })();
  }, [setTableData]);

  const handleViewportChange = e => setViewport(e);

  const handleCityPinClick = async id => {
    const res = await request.get("user", { id });
    if (res && res.data.length > 0) {
      const { latitude, longitude } = res.data[0];
      return setPopupUser({
        ...res.data[0],
        latitude: Number(latitude),
        longitude: Number(longitude),
        isOpen: true
      });
    }
  };

  const handlePopupClose = () =>
    setPopupUser({
      ...popupUser,
      isOpen: false
    });

  const MAPBOX_TOKEN =
    "pk.eyJ1Ijoidml2aWFuZWRpYXMiLCJhIjoiY2s2bWJud3ZyMG85NzNrcWZvanFwcGsyMiJ9.-Pqx8_Ev_QNmHqoGEzwBcw";

  return (
    <>
      {tableData && (
        <MapGL
          width="100vw"
          height="100vh"
          onViewportChange={handleViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          {...viewport}
        >
          <Pins data={tableData} onClick={handleCityPinClick} />
          {popupUser.isOpen && (
            <Popup
              tipSize={5}
              anchor="top"
              latitude={Number(popupUser.latitude)}
              longitude={Number(popupUser.longitude)}
              closeOnClick={false}
              onClose={handlePopupClose}
            >
              <UserInfo {...popupUser} />
            </Popup>
          )}
        </MapGL>
      )}
    </>
  );
};

export default Map;
