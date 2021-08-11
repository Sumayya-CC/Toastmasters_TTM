import React, { Component } from 'react';
import './Topics.css';
import { IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

class Topics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topics: [[
                { word: "Tree", done: false, show: true },
                { word: "Cat", done: false, show: false },
                { word: "Umbrella", done: false, show: false },
                { word: "Tomato", done: false, show: false },
                { word: "Lap Top", done: false, show: false },
                { word: "Forest", done: false, show: false },
                { word: "Water", done: false, show: false },
                { word: "Principal", done: false, show: false }
            ], [
                { word: "Bottle", done: false, show: true },
                { word: "WiFi", done: false, show: false },
                { word: "Squirrel", done: false, show: false },
                { word: "Door", done: false, show: false },
                { word: "Ship", done: false, show: false },
                { word: "Grass", done: false, show: false },
                { word: "Ball", done: false, show: false },
                { word: "Fan", done: false, show: false }
            ], [
                { word: "Gum", done: false, show: true },
                { word: "Cloud", done: false, show: false },
                { word: "Iceland", done: false, show: false },
                { word: "Rocket", done: false, show: false },
                { word: "Elephant", done: false, show: false },
                { word: "Ring", done: false, show: false },
                { word: "Cup", done: false, show: false },
                { word: "Hat", done: false, show: false }
            ], [
                { word: "America", done: false, show: true },
                { word: "Monkey", done: false, show: false },
                { word: "Scale", done: false, show: false },
                { word: "Mobile", done: false, show: false },
                { word: "River", done: false, show: false },
                { word: "Mango", done: false, show: false },
                { word: "Light", done: false, show: false },
                { word: "Shirt", done: false, show: false }
            ], [
                { word: "Blue", done: false, show: true },
                { word: "Mirror", done: false, show: false },
                { word: "Bat", done: false, show: false },
                { word: "Sun", done: false, show: false },
                { word: "Bee", done: false, show: false },
                { word: "Banana", done: false, show: false },
                { word: "File", done: false, show: false },
                { word: "Car", done: false, show: false }
            ], [
                { word: "Butterfly", done: false, show: true },
                { word: "Snow", done: false, show: false },
                { word: "Alarm", done: false, show: false },
                { word: "Stick", done: false, show: false },
                { word: "Village", done: false, show: false },
                { word: "Fox", done: false, show: false },
                { word: "Ant", done: false, show: false },
                { word: "Moon", done: false, show: false }
            ]],
            page: 0,
            tmShow: true,
            toastmasters: [],
            toastmaster: "",
            input: "",
            word: 1,
            bgColor: "blue",
            color: "white",
            alert: false
        }
    }
    componentDidMount() {
        if (localStorage.getItem("toastmasters")) {
            this.setState({ toastmasters: JSON.parse(localStorage.getItem("toastmasters")) });
        }
    }
    componentWillUnmount() {
        localStorage.removeItem("toastmasters");
    }
    click = (i, j) => {
        this.setState({
            topics: this.state.topics.map((topics, index) => index !== i ?
                topics : topics.map((topic, ix) => {
                    if (ix === j) {
                        return { ...topic, done: true }
                    } else if (ix === j + 1) {
                        return { ...topic, show: true }
                    } else {
                        return topic
                    }
                }
                )),
            word: j, alert: false
        });
        setTimeout(
            () => this.setState({ alert: true }),
            1000 * 15 // in milliseconds
        );
    }
    paging = (a) => {
        if (a) {
            this.setState({ page: this.state.page - 1 });
        } else {
            this.setState({ page: this.state.page + 1, tmShow: true, toastmaster: "" })
        }
    }
    random = () => {
        let tm = this.state.toastmasters[Math.floor(Math.random() * this.state.toastmasters.length)];
        if (window.confirm("Select TM " + tm)) {
            this.select(tm);
        } else {
            this.remove(tm);
        }
    }
    select = (tm) => {
        this.setState({ toastmaster: tm });
        this.remove(tm);
    }
    remove = (tm) => {
        this.setState({
            toastmasters: this.state.toastmasters.filter(function (person) {
                return person !== tm
            })
        }, () => {
            localStorage.setItem("toastmasters", JSON.stringify(this.state.toastmasters))
        });
    }
    add = (e) => {
        e.preventDefault();
        this.setState({
            toastmasters: this.state.toastmasters.concat(this.state.input), input: ""
        }, () => {
            localStorage.setItem("toastmasters", JSON.stringify(this.state.toastmasters))
        })
    }
    changeHandler = (e) => {
        this.setState({ input: e.target.value })
    }
    getTopic() {
        clearTimeout(this.timer)
        clearTimeout(this.timer1)
        clearTimeout(this.timer2)
        clearTimeout(this.timer3)
        this.setState({ tmShow: false, alert: false, word: 1 });
        this.handleChangeColor('blue', 'white');
        this.timer = setTimeout(
            () => this.setState({ alert: true }),
            1000 * 15 // in milliseconds
        );
        this.timer1 = setTimeout(
            () => this.handleChangeColor('green', 'white'),
            60000 * 1 // in milliseconds
        );
        this.timer2 = setTimeout(
            () => this.handleChangeColor('yellow', 'black'),
            60000 * 1.5 // in milliseconds
        );
        this.timer3 = setTimeout(
            () => this.handleChangeColor('red', 'white'),
            60000 * 2 // in milliseconds
        );
    }
    handleChangeColor = (bgColor, color) => {
        this.setState({
            bgColor: bgColor, color: color
        })
    }
    render() {
        return (
            <div style={{ margin: "50px" }}>
                <div hidden={!this.state.tmShow}>
                    <div style={{ width: '50%', marginLeft: '20%', marginTop: '2%' }}>
                        <h1 style={{ color: "royalblue" }}>Toastmasters Table Topics <span hidden={this.state.toastmaster === ""}>
                            <Tooltip aria-label="tt" placement="bottom-start" title={
                                <React.Fragment><h2 color="inherit">Go to Table topic</h2></React.Fragment>}>
                                <IconButton style={{ color: "royalblue", }} fontSize="large"><ArrowForwardIcon onClick={() => this.getTopic()} /></IconButton>
                            </Tooltip></span></h1>
                        <h2 style={{ color: "#d5212e" }}>Selected TM {this.state.toastmaster}</h2>
                        <form onSubmit={this.add}>
                            <input type='text' required onChange={this.changeHandler} value={this.state.input}
                                style={{ width: "30%", height: "30px", marginBottom: "1%", marginTop: "1%" }} />
                            <button
                                type="submit"
                                style={{ width: "15%", height: "30px", marginLeft: "5%", marginTop: '1%', backgroundColor: '#0f5778', color: 'white', cursor: "pointer" }}>
                                ADD
                            </button>
                        </form>
                        {this.state.toastmasters.map((tm, i) => (
                            <h3 key={i}>
                                <Tooltip aria-label="tt" placement="bottom-start" title={
                                    <React.Fragment><h2 color="inherit">Select TM {tm}</h2></React.Fragment>}>
                                    <span onClick={() => this.select(tm)} style={{ cursor: "pointer" }}>TM {tm} </span>
                                </Tooltip>
                                <IconButton style={{ color: "#d5212e" }}><DeleteIcon onClick={() => this.remove(tm)} /></IconButton></h3>
                        ))}
                        <button onClick={this.random}
                            style={{ width: "15%", height: "40px", marginTop: '1%', backgroundColor: '#2fadcc', color: 'white', fontSize: "18px", cursor: "pointer" }}>
                            RANDOM
                        </button>
                    </div>
                </div>
                {this.state.topics.map((topics, i) => (
                    <div key={i} hidden={this.state.page !== i || this.state.tmShow}>
                        <h3>TT: {this.state.page + 1}</h3>
                        <button hidden={this.state.topics.length - 2 < this.state.page} style={{
                            backgroundColor: this.state.bgColor, color: this.state.color, minWidth: "100px", fontSize: "20px", padding: "10px",
                            marginRight: "100px", float: "right"
                        }} onClick={() => this.paging(false)}>Next</button>
                        <h4 style={{ cursor: "pointer" }} onClick={() => this.setState({ tmShow: true })}>
                            <Tooltip aria-label="tt" placement="bottom-start" title={
                                <React.Fragment><h2 color="inherit">Change TM {this.state.toastmaster}</h2></React.Fragment>}>
                                <span>TM {this.state.toastmaster}</span></Tooltip></h4>
                        {topics.map((topic, j) => (
                            <div key={j} style={{ margin: "30px" }}>
                                <button style={{
                                    backgroundColor: (this.state.alert && this.state.word === j - 1) ? "red" : "#61dafb", minWidth: "100px", fontSize: "20px", padding: "10px",
                                    marginLeft: j * 200 + "px",
                                }} disabled={topic.done} hidden={!topic.show}
                                    onClick={() => this.click(i, j)}>{topic.word}</button>
                                <br />
                                <br />
                            </div>
                        ))}
                        <button hidden={this.state.page === 0} onClick={() => this.paging(true)}>back</button>
                    </div>
                ))}
            </div>
        );
    }

}

export default Topics;