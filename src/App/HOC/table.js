import React from 'react';

// SUPPORT
import { handleError    } from '../appsupport';
import { reverseRecords } from '../appsupport';

function table(Component, url) {

    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                records: [],
                spiner: true,
            };

            // Handlers
            this.onAdd         = this.onAdd.bind(this);
            this.onEdit        = this.onEdit.bind(this);
            this.onDelete      = this.onDelete.bind(this);
            this.onRefresh     = this.onRefresh.bind(this);

            // Requests
            this.requestGet    = this.requestGet.bind(this);
            this.requestPut    = this.requestPut.bind(this);
            this.requestDelete = this.requestDelete.bind(this);
            this.requestPost   = this.requestPost.bind(this);
        }

        //* When component will be mounted, 
        //* we will be make a request on the server
        //* that to take all records
        componentDidMount() {
            this.requestGet()
        }
        
        
        async requestGet() {
            try {
                //* Spiner state LOAD
                this.setState({spiner: false});
                
                const req = await fetch(`${url}/api/records`);
                const res = await req.json();
                
                this.setState({records: res});
            } catch(err) {
                handleError(err);
            } finally {
                //* Spiner state DISLOAD
                this.setState({spiner: true});
            }
        }

        async requestPut(data) {
            try {
                const req = await fetch(`${url}/api/records`,
                    {
                        mode: 'cors',
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({data: data}),
                    },
                );

                const res = await req.json();
                const rev = await reverseRecords(res);
                
                return rev;

            } catch(err) {
                handleError(err);
            }
        }

        async requestDelete(id) {
            try {
                const req = await fetch(`${url}/api/records/${id}`,
                    {
                        mode: 'cors',
                        method: 'DELETE',
                    }
                );
                
                //* We return status-code 
                //* that to take decision
                return req.status;

            } catch(err) {
                handleError(err);
            }
        }

        async requestPost(id, data) {
            try {
                const req = await fetch(`${url}/api/records/${id}`,
                    {
                        mode: 'cors',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({data: data}),
                    },
                );

                return req.status;

            } catch(err) {
                handleError(err);
            }
        }


        //* Handler onAdd makess the request on server
        //* and create a record on server
        //* after that we add a new record in state
        //* We do it so to take ID
        async onAdd(row) {
            let response = await this.requestPut(row);
            let records;
            
            records  = [ 
                response, 
                ...this.state.records 
            ];
            
            this.setState({records: records});
        }


        // Handler onEdit edits records
        async onEdit(index, row, recordID) {
            let response = await this.requestPost(recordID, row);
            let records;

            //* if the response is successful 
            //* the fields become read
            if (response === 200) {
                records = [ ...this.state.records ];
                records.find((record, i) => {
                    (index === i) && (record.data = row);
                });
    
                this.setState({records: records});
                
                return false;
            } else {
                return true;
            }
        }


        async onDelete(index, recordID) {
            let response = await this.requestDelete(recordID);
            let records;

            if (response === 200) {
                records = [ ...this.state.records ];
                records.splice(index, 1);
                
                this.setState({records: records});
            }
        }


        //* Handler onRefresh updates 
        //* all records on the page
        onRefresh() {
            this.requestGet();
        }

        render() {
            return <Component {...this.props} {...this.state} onDelete={this.onDelete} onEdit={this.onEdit} onAdd={this.onAdd} onRefresh={this.onRefresh}/>
        }
    }
}

export default table;