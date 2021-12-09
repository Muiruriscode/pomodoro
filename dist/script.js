function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const audio = document.getElementById("beep");

class Pomodoro extends React.Component {








  constructor(props) {
    super(props);_defineProperty(this, "state", { breakCount: 5, sessionCount: 25, clockCount: 25 * 60, currentTimer: "Session", isTimerOn: false });_defineProperty(this, "handlePlayPause",







    () => {
      const { isTimerOn } = this.state;
      if (isTimerOn) {
        clearInterval(this.loop);
        this.setState({
          isTimerOn: false });

      } else {
        this.setState({
          isTimerOn: true });

        this.loop = setInterval(() => {
          const { clockCount,
            currentTimer,
            breakCount,
            sessionCount } = this.state;

          if (clockCount === 0) {
            this.setState({
              currentTimer: currentTimer === "Session" ? "Break" : "Session",
              clockCount: currentTimer === "Session" ? breakCount * 60 : sessionCount * 60 });

            audio.play();
          } else {
            this.setState({
              clockCount: clockCount - 1 });

          }
        }, 1000);
      }
    });_defineProperty(this, "handleReset",

    () => {
      this.setState({
        breakCount: 5,
        sessionCount: 25,
        clockCount: 25 * 60,
        currentTimer: "Session",
        isTimerOn: false });


      clearInterval(this.loop);

      audio.pause();
      audio.currentTime = 0;

    });_defineProperty(this, "formatTime",


    count => {
      let minutes = Math.floor(count / 60);
      let seconds = count % 60 < 10 ? "0" + count % 60 : count % 60;

      minutes = minutes < 10 ? "0" + minutes : minutes;
      return `${minutes}:${seconds}`;
    });_defineProperty(this, "handleBreakDecrease",


    () => {
      const { breakCount, isTimerOn, currentTimer } = this.state;

      if (breakCount > 1) {
        if (!isTimerOn && currentTimer === "Break") {
          this.setState({
            breakCount: breakCount - 1,
            clockCount: (breakCount - 1) * 60 });

        } else {
          this.setState({
            breakCount: breakCount - 1 });


        }
      }
    });_defineProperty(this, "handleBreakIncrease",
    () => {
      const { breakCount, isTimerOn, currentTimer } = this.state;

      if (breakCount < 60) {
        if (!isTimerOn && currentTimer === "Break") {
          this.setState({
            breakCount: breakCount + 1,
            clockCount: (breakCount + 1) * 60 });

        } else {
          this.setState({
            breakCount: breakCount + 1 });


        }
      }
    });_defineProperty(this, "handleSessionDecrease",

    () => {
      const { sessionCount, isTimerOn, currentTimer } = this.state;

      if (sessionCount > 1) {
        if (!isTimerOn && currentTimer === "Session") {
          this.setState({
            sessionCount: sessionCount - 1,
            clockCount: (sessionCount - 1) * 60 });

        } else {
          this.setState({
            sessionCount: sessionCount - 1 });


        }
      }
    });_defineProperty(this, "handleSessionIncrease",

    () => {
      const { sessionCount, isTimerOn, currentTimer } = this.state;

      if (sessionCount < 60) {
        if (!isTimerOn && currentTimer === "Session") {
          this.setState({
            sessionCount: sessionCount + 1,
            clockCount: (sessionCount + 1) * 60 });

        } else {
          this.setState({
            sessionCount: sessionCount + 1 });


        }
      }
    });this.loop = undefined;}componentWillUnmount() {clearInterval(this.loop);}

  render() {
    const { breakCount,
      sessionCount,
      clockCount,
      currentTimer } =
    this.state;

    const breakProps = {
      title: "Break",
      count: breakCount,
      handleDecrease: this.handleBreakDecrease,
      handleIncrease: this.handleBreakIncrease };


    const sessionProps = {
      title: "Session",
      count: sessionCount,
      handleDecrease: this.handleSessionDecrease,
      handleIncrease: this.handleSessionIncrease };


    const { isTimerOn } = this.state;
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { className: "flex" }, /*#__PURE__*/
      React.createElement(SetTimer, breakProps), /*#__PURE__*/
      React.createElement(SetTimer, sessionProps)), /*#__PURE__*/

      React.createElement("div", { className: "clock-container" }, /*#__PURE__*/
      React.createElement("h1", { id: "timer-label" }, currentTimer), /*#__PURE__*/
      React.createElement("span", { id: "time-left" }, this.formatTime(clockCount)), /*#__PURE__*/

      React.createElement("div", { className: "flex" }, /*#__PURE__*/
      React.createElement("button", { id: "start_stop", className: "btn-large cyan", onClick: this.handlePlayPause },
      isTimerOn ? /*#__PURE__*/
      React.createElement("i", { className: "material-icons" }, "pause_circle_outline") : /*#__PURE__*/
      React.createElement("i", { className: "material-icons" }, "play_circle_outline")), /*#__PURE__*/


      React.createElement("button", { id: "reset", className: "btn-large cyan", onClick: this.handleReset }, /*#__PURE__*/
      React.createElement("i", { className: "material-icons" }, "autorenew"))))));





  }}



const SetTimer = props => {
  const id = props.title.toLowerCase();
  return /*#__PURE__*/(
    React.createElement("div", { className: "timer-container" }, /*#__PURE__*/
    React.createElement("h2", { id: `${id}-label` }, props.title, " Length"), /*#__PURE__*/
    React.createElement("div", { className: "flex action-wrapper" }, /*#__PURE__*/
    React.createElement("button", { id: `${id}-decrement`, className: "btn-small cyan", onClick: props.handleDecrease }, /*#__PURE__*/
    React.createElement("i", { className: "material-icons" }, "arrow_downward")), /*#__PURE__*/

    React.createElement("span", { id: `${id}-length` }, props.count), /*#__PURE__*/
    React.createElement("button", { id: `${id}-increment`, className: "btn-small cyan", onClick: props.handleIncrease }, /*#__PURE__*/
    React.createElement("i", { className: "material-icons" }, "arrow_upward")))));




};

ReactDOM.render( /*#__PURE__*/React.createElement(Pomodoro, null), document.getElementById('app'));