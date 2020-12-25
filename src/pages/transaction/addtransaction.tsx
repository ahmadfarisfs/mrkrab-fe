
import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
import movies from "../../movies";
import axios from 'axios';
import { Spin, Button, Drawer, Tag, Badge, Switch, Card, Form, Input, Space, Select, Empty } from 'antd';
import { useHistory, Route } from 'react-router-dom';
//import debounce from 'lodash/debounce';
import _ from "lodash";
import moment from 'moment';
import configData from "../../config.json";
import {
    UserAddOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { OptionProps, OptionType } from 'antd/lib/select';
const { Option } = Select;

const MySwal = withReactContent(Swal);
export interface IProjectData {
    name: string[];
    accountID: number[];
};

const AddTransactionPage = () => {
    const [isFetchingProject, setIsFetchingProject] = useState(false);
    const [pockets, setPockets] = useState<any[]>([{}]);
    const [form] = Form.useForm();
    const [projectData, setProjectData] = useState<IProjectData>();
    const [projectDetails, setProjectDetails] = useState([]);
    const [lastFetchProjectID, setLastFetchProjectID] = useState(0);

    const tailLayout = {
        wrapperCol: {
            offset: 6,
            span: 16,
        },
    };
    const onProjectChange = (val: any) => {
        console.log("seleted akunid " + val);
        let selectedProj: any = projectDetails.filter((element: any) => element.AccountID === val)[0];
        console.log("seleted proj budgets ");
        console.log(selectedProj);
        form.setFieldsValue({
            Pocket: selectedProj.Budgets.length === 0 ? 'No Pocket' : null
        })
        setPockets(selectedProj.Budgets);

    }

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
                accountIDs.push(v.AccountID)
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
    // useEffect(()=>{
    //     console.log("project detials efek")
    //     console.log(projectDetails)
    //     // fetchProject("");
    // },[projectDetails]);
    // _.debounce(fetchProject,1000);
    useEffect(() => {
        fetchProject("");
    }, []);
    useEffect(() => {
        console.log("pockets efek")

        console.log(pockets)
        //fetchProject("");
    }, [pockets]);
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };
    const onSubmit = (data: any) => { };
    // const options = projectData?.accountID.map(d => <Option key={d.value}>{d.text}</Option>);

    return (<>

        <Card title="Add User"  >

            <Form {...layout} form={form} name="control-hooks" onFinish={onSubmit} >

                <Form.Item name="Project" label="Project" rules={[{ required: true }]}>
                    <Select

                        showSearch
                        // labelInValue
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
                <Form.Item name="Pocket" label="Pocket" rules={[{ required: !(!pockets || pockets.length === 0) }]}>
                    <Select
                        defaultActiveFirstOption={false}

                        // showSearch
                        // labelInValue

                        loading={isFetchingProject}
                        placeholder="Select pocket"
                        //   value={(!pockets || pockets.length===0) ? "No Pockets":'' }
                        disabled={!pockets || pockets.length === 0}
                        notFoundContent={isFetchingProject ? <Spin size="small" /> : <Empty />}
                        // filterOption={false}
                        // onSearch={fetchProject}
                        onChange={(v) => {
                            console.log(v);
                        }}
                        style={{ width: '100%' }}
                    >
                        {

                            pockets &&
                            pockets.map((element, index) => {
                                return (<Option value={element.AccountID}>

                                    {element?.Name}


                                    { element.Limit === null ?
                                        <Tag color="green" style={{ float: 'right'  }}>unlimited</Tag>
                                        :
                                        <Tag color="orange" style={{ float: 'right' }}>limited: {formatter.format(element.Limit)}</Tag>

                                    }  </Option>)
                            })

                        }

                    </Select>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Submit
  </Button>
                        <Button htmlType="button" onClick={() => {
                            form.resetFields();

                        }} >
                            Reset
  </Button>
                    </Space>
                </Form.Item>
            </Form>

        </Card>
    </>)
};

export default AddTransactionPage;