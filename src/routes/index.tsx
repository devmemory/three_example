import React from "react";
import { useNavigate } from "react-router-dom";
import { CommonBtn } from "src/components";
import { routeName } from "src/util/routeUtil";

const MainIndex = () => {
  const routes = Object.entries(routeName);

  const navi = useNavigate();

  return (
    <div className="div_main_btn">
      {routes.map((e, i) => {
        return (
          <CommonBtn key={`r_${i}`} margin="10px" onClick={() => navi(e[1])}>
            {e[0]}
          </CommonBtn>
        );
      })}
    </div>
  );
};

export default MainIndex;
