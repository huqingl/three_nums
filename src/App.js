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
        {Array.from(new Array(10), (v, i) => {
          const el = i === num ? <Number num={i} bgColor={bgColor} /> : "";
          return <Square key={i} dataHasNum={i} children={el} />;
        })}
      </div>
    </div>
  );
}
function PredictRow({ num, bgColor, makeNum }) {
  // useEffect(()=>{
  // console.log(one)
  // },[])
  return (
    <div className="row mr-2">
      <div className="flex">
        {Array.from(new Array(10), (v, i) => {
          const el = i === num ? <Number num={num} bgColor={bgColor} /> : "";
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

function App() {
  // const [prev, setPrev] = useState('')
  // const [data, setData] = useState([])
  const [one, setOne] = useState([])
  const [two, setTwo] = useState([])
  const [three, setThree] = useState([])
  const [sumEnd, setSumEnd] = useState([])
  const [sumDiff, setSumDiff] = useState([])
  var oneRef = useRef()
  // const prevO = useRef("000")
  // const dataO = useRef(["000","000"])
  // var prev, data1
  useEffect(() => {
    // prev, data1
    var prev = "000"
    var one = [],
      two = [],
      three = [],
      sumEnd = [],
      sumDiff = [];
    axios.get('https://huqinlong.com/d/houtai/get_history_before.php').then((res) => {
      prev = res.data[0]
    })
    axios.get('https://huqinlong.com/d/houtai/get_history.php').then((res) => {
      res.data.map((item, index) => {
        one.push(parseInt(item.charAt(0)));
        two.push(parseInt(item.charAt(1)));
        three.push(parseInt(item.charAt(2)));
        let sum =
          parseInt(item.charAt(0)) +
          parseInt(item.charAt(1)) +
          parseInt(item.charAt(2));
        let sumE = parseInt(sum % 10);
        sumEnd.push(sumE);
        if (index === 0) {
          var sumD = Math.abs(
            sumE -
            parseInt(
              (parseInt(prev.charAt(0)) +
                parseInt(prev.charAt(1)) +
                parseInt(prev.charAt(2))) %
              10
            )
          );
        } else {
          sumD = Math.abs(sumEnd[index] - sumEnd[index - 1]);
        }
        sumDiff.push(sumD);
      });
      setOne(one)
      oneRef.current = one
      setTwo(two)
      setThree(three)
      setSumEnd(sumEnd)
      setSumDiff(sumDiff)
    })

  }, [])
  // const prev = "557";
  // const data = ['216', '057', '182', '427', '751', '245', '730', '665', '190', '888', '119', '030', '737', '932', '567', '702', '066', '730', '667'];
  // var one = [],
  //   two = [],
  //   three = [],
  //   sumEnd = [],
  //   sumDiff = [];


  // const one = [0, 3, 8, 4];
  // const two = [9, 4, 1, 5];
  // const three = [3, 1, 2, 7];
  const [oneWidth, setOneWidth] = useState(0);
  const [oneHeight, setOneHeight] = useState(0);

  const Draw = (data, id) => {
    // console.log(data)
    let cnv = document.getElementById(id);
    let cxt = cnv.getContext("2d");
    cxt.imageSmoothingEnabled = true
    cxt.beginPath();

    let startNum = data[0];
    let startX = startNum * 20 + 10;
    let startY = 10;
    cxt.moveTo(startX, startY);
    data.map((item, index) => {
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
      const oneLenth = oneRef.current.length;
      const oneWidth = 20 * 10;
      const oneHeight = 20 * oneLenth;
      setOneWidth(oneWidth);
      setOneHeight(oneHeight);
      Draw(one, "canvas");
      Draw(two, "canvas1");
      Draw(three, "canvas2");
      Draw(sumEnd, "canvas3");
      Draw(sumDiff, "canvas4");
    },2000)
  }, [one]);
  const predictDraw = (predictNum, data, id, No) => {
    //设置连接线所在canvas画布的宽度
    let lastNum = data[data.length - 1];
    let width = Math.abs(lastNum - predictNum) * 20;
    let top = oneHeight - 10;
    var left;
    if (lastNum < predictNum) {
      left = lastNum * 20 + 10;
    } else {
      left = predictNum * 20 + 10;
    }
    switch (No) {
      case "":
        setPredictWidth(width);
        setPredictTop(top);
        setPredictLeft(left);
        break;
      case "1":
        setPredictWidth1(width);
        setPredictTop1(top);
        setPredictLeft1(left);
        break;
      case "2":
        setPredictWidth2(width);
        setPredictTop2(top);
        setPredictLeft2(left);
        break;
      case "3":
        setPredictWidth3(width);
        setPredictTop3(top);
        setPredictLeft3(left);
        break;
      case "4":
        setPredictWidth4(width);
        setPredictTop4(top);
        setPredictLeft4(left);
        break;
    }
    //设置画布position

    //开始画线
    let cnv = document.getElementById(id);
    let cxt = cnv.getContext("2d");
    cxt.imageSmoothingEnabled = true
    cxt.clearRect(0,0,200,20)
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
  const [num, setNum] = useState(null);
  const [predictWidth, setPredictWidth] = useState(0);
  const [predictTop, setPredictTop] = useState(0);
  const [predictLeft, setPredictLeft] = useState(0);

  const [num1, setNum1] = useState(null);
  const [predictWidth1, setPredictWidth1] = useState(0);
  const [predictTop1, setPredictTop1] = useState(0);
  const [predictLeft1, setPredictLeft1] = useState(0);

  const [num2, setNum2] = useState(null);
  const [predictWidth2, setPredictWidth2] = useState(0);
  const [predictTop2, setPredictTop2] = useState(0);
  const [predictLeft2, setPredictLeft2] = useState(0);

  const [num3, setNum3] = useState(null);
  const [predictWidth3, setPredictWidth3] = useState(0);
  const [predictTop3, setPredictTop3] = useState(0);
  const [predictLeft3, setPredictLeft3] = useState(0);

  const [num4, setNum4] = useState(null);
  const [predictWidth4, setPredictWidth4] = useState(0);
  const [predictTop4, setPredictTop4] = useState(0);
  const [predictLeft4, setPredictLeft4] = useState(0);

  const makeNum = (predictNum) => {
    //设置点击选择要显示的数字
    setNum(predictNum);
    predictDraw(predictNum, one, "predict-canvas", "");
  };
  const makeNum1 = (predictNum) => {
    //设置点击选择要显示的数字
    setNum1(predictNum);
    predictDraw(predictNum, two, "predict-canvas1", "1");
  };
  const makeNum2 = (predictNum) => {
    //设置点击选择要显示的数字
    setNum2(predictNum);
    predictDraw(predictNum, three, "predict-canvas2", "2");
  };
  const makeNum3 = (predictNum) => {
    //设置点击选择要显示的数字
    setNum3(predictNum);
    predictDraw(predictNum, sumEnd, "predict-canvas3", "3");
  };
  const makeNum4 = (predictNum) => {
    //设置点击选择要显示的数字
    setNum4(predictNum);
    predictDraw(predictNum, sumDiff, "predict-canvas4", "4");
  };
  return (
    <div className="h-full w-full bg-zinc-200 overflow-x-scroll">
      <div className="w-fit h-fit  flex mx-auto pt-10 bg-zinc-200">
        <div className="relative">
          {one.map((item, index) => {
            return <Row num={item} bgColor="#991b1b" key={index} />;
          })}
          <PredictRow num={num} bgColor="#991b1b" makeNum={makeNum} />
          <canvas
            id="predict-canvas"
            width={predictWidth}
            height={20}
            color="#111"
            style={{
              position: "absolute",
              top: predictTop,
              left: predictLeft,
              zIndex: 2,
              // border: "1px dashed #111",
            }}
          ></canvas>
          <canvas
            id="canvas"
            width={oneWidth}
            height={oneHeight}
            color="#111"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 2,
              // border: "1px dashed #111",
            }}
          ></canvas>
        </div>
        <div className="relative">
          {two.map((item, index) => {
            return <Row num={item} bgColor="#0284c7" key={index} />;
          })}
          <PredictRow num={num1} bgColor="#0284c7" makeNum={makeNum1} />
          <canvas
            id="predict-canvas1"
            width={predictWidth1}
            height={20}
            color="#111"
            style={{
              position: "absolute",
              top: predictTop1,
              left: predictLeft1,
              zIndex: 2,
              // border: "1px dashed #111",
            }}
          ></canvas>
          <canvas
            id="canvas1"
            width={oneWidth}
            height={oneHeight}
            color="#111"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 2,
              // border: "1px dashed #111",
            }}
          ></canvas>
        </div>
        <div className="relative">
          {three.map((item, index) => {
            return <Row num={item} bgColor="#166534" key={index} />;
          })}
          <PredictRow num={num2} bgColor="#166534" makeNum={makeNum2} />
          <canvas
            id="predict-canvas2"
            width={predictWidth2}
            height={20}
            color="#111"
            style={{
              position: "absolute",
              top: predictTop2,
              left: predictLeft2,
              zIndex: 2,
              // border: "1px dashed #111",
            }}
          ></canvas>
          <canvas
            id="canvas2"
            width={oneWidth}
            height={oneHeight}
            color="#111"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 2,
              // border: "1px dashed #111",
            }}
          ></canvas>
        </div>
        <div className="relative">
          {sumEnd.map((item, index) => {
            return <Row num={item} bgColor="#a16207" key={index} />;
          })}
          <PredictRow num={num3} bgColor="#a16207" makeNum={makeNum3} />
          <canvas
            id="predict-canvas3"
            width={predictWidth3}
            height={20}
            color="#111"
            style={{
              position: "absolute",
              top: predictTop3,
              left: predictLeft3,
              zIndex: 2,
              // border: "1px dashed #111",
            }}
          ></canvas>
          <canvas
            id="canvas3"
            width={oneWidth}
            height={oneHeight}
            color="#111"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 2,
              // border: "1px dashed #111",
            }}
          ></canvas>
        </div>
        <div className="relative">
          {sumDiff.map((item, index) => {
            return <Row num={item} bgColor="#155e75" key={index} />;
          })}
          <PredictRow num={num4} bgColor="#155e75" makeNum={makeNum4} />
          <canvas
            id="predict-canvas4"
            width={predictWidth4}
            height={20}
            color="#111"
            style={{
              position: "absolute",
              top: predictTop4,
              left: predictLeft4,
              zIndex: 2,
              // border: "1px dashed #111",
            }}
          ></canvas>
          <canvas
            id="canvas4"
            width={oneWidth}
            height={oneHeight}
            color="#111"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 2,
              // border: "1px dashed #111",
            }}
          ></canvas>
        </div>
      </div>
      <div className="h-20 bg-zinc-200"></div>
    </div>
  );
}
export default App;
