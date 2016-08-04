import React from 'react';
import { Link } from 'react-router';
import Draggable from 'react-draggable';

export default class DashboardList extends React.Component {

    constructor(props, context) {
	super(props, context);
	this.populateLinks = this.populateLinks.bind(this);
    }
        
    populateLinks(link) {
	return (
	    <Draggable
	    axis="both"
	    handle=".handle"
	    defaultPosition={{x: 0, y: 0}}
	    position={null}
	    grid={[25, 25]}
	    zIndex={100}
	    onStart={this.handleStart}
	    onDrag={this.handleDrag}
	    onStop={this.handleStop}>
	    <div>
	    <div className="handle">
	    <div><Link to={'/dashboards/' + link}>{link}</ Link></div>
	    </div>
	    </div>
	    </Draggable>	    
	);
    }

    render() {
	return (
	    <div>
	    {this.props.dashboards.map(this.populateLinks)}
	    </div>
	);
    }

}
