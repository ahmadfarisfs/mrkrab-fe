import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
} from "@coreui/react";
import { endpointURL } from '../../settings';

const getBadge = (status) => {
  switch (status) {
    case "ongoing":
      return "success";
    case "closed":
      return "secondary";
    case "":
      return "primary";
    default:
      return "primary";
  }
};

const Projects = () => {
  const itemPerpage = 5;
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [projectsData, setProjects] = useState();
  const [totalPage, setTotalPage] = useState();

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/projects?page=${newPage}`);
  };

  useEffect(() => {
    console.log("useEffect");
    const urlFetch = fetch(endpointURL+"/project");
    urlFetch
      .then((res) => {
        if (res.status === 200) {
          console.log("200 !");
          return res.json();
        }
      })
      .then((resJson) => {
        console.log(resJson);
        setTotalPage(resJson.total_page);
        setProjects(resJson.records);
      });
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardBody>
            <CRow>
              <CCol>
                {" "}
                <CButton
                  className="m-2"
                  variant="outline"
                  color="primary"
                  size="sm"
                  to="/projects/add"
                >
                  Add User
                </CButton>
              </CCol>
            </CRow>

            <CDataTable
              items={projectsData}
              fields={[
                { key: "id", _classes: "font-weight-bold" },
                "name",
                "project_type",
                "pic_id",
                "status",
                "created_at"
              ]}
              hover
              striped={true}
              itemsPerPage={itemPerpage}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/projects/${item.id}`)}
              scopedSlots={{
                status: (item) => (
                  <td>
                    <CBadge color={getBadge(item.status)}>
                      {item.status.toUpperCase()}
                    </CBadge>
                  </td>
                ),
              }}
            />
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={totalPage}
              doubleArrows={true}
              align="center"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Projects
