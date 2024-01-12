import React from "react";

class Timer extends React.Component {
    constructor() {
        super();

        this.state = {
            value: Number(30)
        };

        this.intervalRef = React.createRef();
    }

    componentDidMount() {
        this.intervalRef.current = setInterval(() => {
            if (this.state.value > 0) {
                this.setState((prevState) => ({
                    value: prevState.value - 1
                }));
            } else {
                this.stopTimer();
            }
        }, 1000);
    }

    componentWillUnmount() {
        this.stopTimer();
    }

    stopTimer = () => {
        clearInterval(this.intervalRef.current);
    };

    render() {
        return (
            <div className="mx-1">
                {this.state.value !== 0 ?
                    <div>
                        Resend the OTP in {this.state.value} sec
                    </div> : 
                    <a className="cursor text-decoration-underline text-secondary" onClick={this.props.onReset}>
                        Resend OTP
                    </a>
                }
            </div>
        );
    }
}

export default Timer;
