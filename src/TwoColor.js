import "./App.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
function Square({ dataHasNum, children }) {
  return (
    <div
      className="square w-5 h-5 flex justify-center items-center"
      data-has-num={dataHasNum}
    >
      {children}
    </div>
  );
}

function PredictSquare({ dataHasNum, children, makeNum }) {
  const setNum = (i) => {
    makeNum(i);
  };
  return (
    <div
      className="square w-5 h-5 flex justify-center items-center cursor-pointer"
      data-has-num={dataHasNum}
      onClick={() => setNum(dataHasNum)}
    >
      {children}
    </div>
  );
}
function Number({ num, bgColor }) {
  return (
    <span
      className="block w-3.5 h-3.5 text-center text-white z-10"
      style={{
        borderRadius: "50%",
        fontSize: "12px",
        lineHeight: "16px",
        backgroundColor: bgColor,
      }}
    >
      {num}
    </span>
  );
}

function Row({ num, bgColor }) {
  return (
    <div className="row mr-2">
      <div className="flex">
        {Array.from(new Array(33), (v, i) => {
          const el = i === num ? <Number num={i} bgColor={bgColor} /> : "";
          return <Square key={i} dataHasNum={i} children={el} />;
        })}
      </div>
    </div>
  );
}
function PredictRow({ num, bgColor, makeNum }) {
  return (
    <div className="row mr-2">
      <div className="flex">
        {Array.from(new Array(33), (v, i) => {
          const el =
            i === num ? (
              <Number num={num} bgColor={bgColor} />
            ) : (
              ""
            );
          return (
            <PredictSquare
              key={i}
              dataHasNum={i}
              children={el}
              makeNum={makeNum}
            />
          );
        })}
      </div>
    </div>
  );
}


function TwoColor() {
  const [one, setOne] = useState([]);
  var oneRef = useRef();

  const colors = ["#991b1b", "#0284c7", "#166534", "#a16207", "#155e75"];
  useEffect(() => {
    axios.get("http://yuduntech.com:8070/d/houtai/get_two_color.php?num=0").then((res) => {
      let one = [];
      let tempData = res.data;
      tempData.forEach((item) => {
        one.push(parseInt(item));
      });
      oneRef.current = one;
      setOne(one);
    });

  }, []);

  const Draw = (data) => {
    // console.log(data)
    let cnv = document.getElementById("canvas");
    let cxt = cnv.getContext("2d");
    cxt.beginPath();
    let startNum = data[0];
    let startX = startNum * 20 + 10;
    let startY = 10;
    cxt.moveTo(startX, startY);
    data.forEach((item, index) => {
      if (index > 0) {
        let x = item * 20 + 10;
        let y = index * 20 + 10;
        cxt.lineTo(x, y);
      }
    });
    cxt.stroke();
  };
  useEffect(() => {
    setTimeout(() => {
      // const onelenth = oneRef.current.length;
      // const onewidth = 20 * 10;
      // const oneheight = 20 * onelenth;
      // setOneWidth(onewidth);
      // setOneHeight(oneheight);
      Draw(oneRef.current);
    }, 2000);
  });
  const predictDraw = (predictNum, data) => {
    //设置连接线所在canvas画布的宽度
    let lastNum = data[data.length - 1];
    let width = Math.abs(lastNum - predictNum) * 20;
    setPredictWidth(width)
    var left;
    if (lastNum < predictNum) {
      left = lastNum * 20 + 10;
    } else {
      left = predictNum * 20 + 10;
    }
    setPredictLeft(left)
    

    //开始画线
    let cnv = document.getElementById('predict-canvas');
    let cxt = cnv.getContext("2d");
    cxt.imageSmoothingEnabled = true
    cxt.clearRect(0, 0, 640, 20);
    setTimeout(() => {
      cxt.beginPath();
      if (lastNum < predictNum) {
        cxt.moveTo(0, 0);
        cxt.lineTo(width, 20);
      } else {
        cxt.moveTo(width, 0);
        cxt.lineTo(0, 20);
      }
      cxt.stroke();
    }, 500);
  };



  //开始画线
  // let cnv = document.getElementById('predict-canvas5');
  // let cxt = cnv.getContext("2d");
  // cxt.imageSmoothingEnabled = true
  // cxt.clearRect(0, 0, 200, 20);
  // setTimeout(() => {
  //   cxt.beginPath();
  //   if (lastNum < predictNum) {
  //     cxt.moveTo(0, 0);
  //     cxt.lineTo(width, 20);
  //   } else {
  //     cxt.moveTo(width, 0);
  //     cxt.lineTo(0, 20);
  //   }
  //   cxt.stroke();
  // }, 500);



  const [num, setNum] = useState('');

  const [predictWidth, setPredictWidth] = useState('');
  const [predictLeft, setPredictLeft] = useState('');

  const makeNum = (predictNum) => {

    setNum(predictNum);
    // setCol([...col, c]);
    predictDraw(predictNum, oneRef.current)
  };


  return (
    <div className="h-full w-full bg-zinc-200">
      <div className="w-fit h-fit flex mx-auto p-10 bg-zinc-200">
        <div className="relative">
          {one.map((item, index) => {
            return <Row num={item} bgColor="#991b1b" key={index} />;
          })}
          <PredictRow
            num={num}
            bgColor={colors[0]}
            makeNum={makeNum}
          />
          <canvas
            id="predict-canvas"
            width={predictWidth}
            height={20}
            color="#111"
            style={{
              position: "absolute",
              top: 30 * 20 - 10,
              left: predictLeft,
              zIndex: 2,
            }}
          ></canvas>
          <canvas
            id="canvas"
            width='640'
            height='600'
            color="#111"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 2,
            }}
          ></canvas>
        </div>
      </div>
    </div>
  );
};
export default TwoColor;
