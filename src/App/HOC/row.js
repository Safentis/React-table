import React from 'react';

function row(Component) {

    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                field: {
                    id: '',
                    name: '',
                    age: '',
                    phone: '',
                    email: '',
                },
            };

            //Handlers
            this.onChange = this.onChange.bind(this);
            this.onUpdate = this.onUpdate.bind(this);
            this.onClear  = this.onClear.bind(this);
        }


        //* onChange is handler of the inputs state
        onChange(event) {
            const field  = { ...this.state.field };
            const name   = event.target.name;
            const value  = event.target.value;

            field[name]  = value;

            this.setState({field: field});
        }

        
        //* onUpdate updates the state 
        //* if varable by name records has changes
        onUpdate(field) {
            this.setState({field: field});
        }


        //* onClear clears all inputs,
        //* after adding an entry on the state
        onClear() {
            const field  = { ...this.state.field };

            for (let value in field) {
                field[value] = '';
            }

            this.setState({field: field});
        }

        render() {
            return (
                <Component {...this.props} {...this.state} onChange={this.onChange} onUpdate={this.onUpdate} onClear={this.onClear}/>
            )
        }
    }
}

export default row;