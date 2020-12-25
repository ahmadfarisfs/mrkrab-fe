

import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
// import movies from "../../movies";
import axios from 'axios';
import { Spin, Button, Drawer, Tag, Badge, Switch, Radio, Card, Form, Input, Space, Select, Empty, InputNumber } from 'antd';
import { useHistory, Route } from 'react-router-dom';
//import debounce from 'lodash/debounce';
import _ from "lodash";
import moment from 'moment';
import configData from "../config.json";
import {
    UserAddOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { OptionProps, OptionType } from 'antd/lib/select';
import { formatCurrency } from './format'
// import { submitWithConfirm } from '../../tools/poster'
// import { currencyFormatter, currencyParser } from '../../tools/format';



const ProjectSelector = (props:any) => {
    const { Option } = Select;
    let onProjectSelected=props.onProjectSelected;
    let  onBudgetSelected=props.onBudgetSelected;
    let  forms= props.forms;
    // {onProjectSelected:any,onBudgetSelected:any,forms:any}

    const MySwal = withReactContent(Swal);
    interface IProjectData {
        name: string[];
        accountID: number[];
    };
    const [isFetchingProject, setIsFetchingProject] = useState(false);
    const [pockets, setPockets] = useState<any[]>([{}]);
    // const [form] = Form.useForm();
    const [projectData, setProjectData] = useState<IProjectData>();
    const [projectDetails, setProjectDetails] = useState([]);
    const [lastFetchProjectID, setLastFetchProjectID] = useState(0);
    const fetchProject = async (value: any) => {
        console.log('fetching project', value);

        setLastFetchProjectID(lastFetchProjectID + 1);

        setProjectData({} as IProjectData)
        setIsFetchingProject(true);
        let response;
        try {
            response = await axios.get(
                configData.baseURL + `/projects?range=[` + 0 + `,` + 4 + `]&search={"name":"` + value + `"}`,
            );
            if (response.status != 200) {
                throw new Error('Unexpected response code');
            }
            let projData: IProjectData = {} as IProjectData;
            let accountIDs: number[] = [];
            let projectNames: string[] = [];
            response.data.forEach((v: any) => {
                accountIDs.push(v.ID)
                projectNames.push(v.Name)
            })
            projData.accountID = accountIDs;
            projData.name = projectNames;
            console.log(response);
            setProjectDetails(response.data);
            setProjectData(projData);

        } catch (error) {
            console.log(error);
            // setProjectDetails({});
            setProjectData({} as IProjectData);
            MySwal.fire(
                {
                    title: 'Error',
                    icon: 'error',
                    text: error,
                }
            )
        } finally {
            setIsFetchingProject(false);
        }

    };
    const onProjectChange = (val: any) => {
        console.log("seleted projectID " + val);
        let selectedProj: any = projectDetails.filter((element: any) => element.ID === val)[0];
        console.log("seleted proj budgets ");
        console.log(selectedProj);
        forms.setFieldsValue({
            Pocket: selectedProj.Budgets.length === 0 ? 'No Pocket' : null
        })
        setPockets(selectedProj.Budgets);
        if (_.isFunction(onProjectSelected)) {
            onProjectSelected(val);
        }

        // onProjectSelected&&onProjectSelected(val);
    };
    useEffect(() => {
        fetchProject("");
    }, []);
    return (<>
        <Form.Item name="Project" label="Project" rules={[{ required: true }]}>
            <Select

                showSearch
                loading={isFetchingProject}
                placeholder="Select project"
                notFoundContent={isFetchingProject ? <Spin size="small" /> : <Empty />}
                filterOption={false}
                onSearch={fetchProject}
                onChange={onProjectChange}
                style={{ width: '100%' }}
            >
                {

                    projectData && projectData.accountID &&
                    projectData.accountID.map((element, index) => {
                        return <Option value={element}>{projectData?.name[index]}</Option>
                    })
                }

            </Select>
        </Form.Item>
        <Form.Item hidden={(!pockets || pockets.length === 0)} name="Pocket" label="Pocket"

        >
            <Select
                defaultActiveFirstOption={false}
                allowClear


                loading={isFetchingProject}
                placeholder="Select pocket or leave blank for project transaction"
                disabled={!pockets || pockets.length === 0}
                notFoundContent={isFetchingProject ? <Spin size="small" /> : <Empty />}
                onChange={(v) => {
                    if (_.isFunction(onBudgetSelected)) {
                        onBudgetSelected(v);
                    };

                    console.log(v);
                }}
                style={{ width: '100%' }}
            >
                {

                    pockets &&
                    pockets.map((element, index) => {
                        return (<Option value={element.ID}>
                            {element?.Name}
                            { element.Limit === null ?
                                <Tag color="green" style={{ float: 'right', verticalAlign: "middle" }}>unlimited</Tag>
                                :
                                <Tag color="orange" style={{ float: 'right', verticalAlign: "middle" }}>limited: {formatCurrency(element.Limit)}</Tag>

                            }  </Option>)
                    })

                }

            </Select>

        </Form.Item>
    </>)
}

export default ProjectSelector;