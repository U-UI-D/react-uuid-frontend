import React, {useState} from "react";

// 时间倒计时组件
function TimeCountDown(props) {
  const {startDateTime} = props;

  let datetime = startDateTime ? new Date(startDateTime) : new Date();

  let [hour, setHour] = useState(23 - datetime.getHours());
  let [min, setMin] = useState(59 - datetime.getMinutes());
  let [sec, setSec] = useState(59 - datetime.getSeconds());

  const runSec = () => {
    let timer = setTimeout(() => {
      setSec(--sec);
    }, 1000);

    if (sec < 0){
      clearTimeout(timer);
      setSec(59);
      setMin(59 - datetime.getMinutes());
      setHour(23 - datetime.getHours());
    }
  };

  runSec();

  return (
    <>
      {
        (hour < 10 ? ("0" + hour) : hour) + ":" + (min < 10 ? ("0" + min) : min) + ":" + (sec < 10 ? ("0" + sec) : sec)
      }
    </>
  );
}

export default TimeCountDown;
