import {Box, Button, IconButton, Typography, useMediaQuery, useTheme,} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {tokens} from "../../theme";
import {mockTransactions} from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import DoorFrontIcon from '@mui/icons-material/DoorFront';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import ParkInfoTable from "../../components/ParkInfoTable";

const Dashboard = () => {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);
  return (
      <Box m="20px">
        {/* HEADER */}

        <Box
            display={smScreen ? "flex" : "block"}
            flexDirection={smScreen ? "row" : "column"}
            justifyContent={smScreen ? "space-between" : "start"}
            alignItems={smScreen ? "center" : "start"}
            m="10px 0"
        >
          <Header title="대시보드" subtitle="공원 관리 대시보드 입니다." />

          <Box>
            <Button
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
            >
              <DownloadOutlinedIcon sx={{ mr: "10px" }} />
              Download Reports
            </Button>
          </Box>
        </Box>

        {/* GRID & CHARTS */}
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
            <Box
                width="100%"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
              <StatBox
                  title="4,315"
                  subtitle="총 공원 입장수"
                  progress="0.75"
                  increase="+14%"
                  icon={
                    <PeopleAltIcon
                        sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                  }
              />
            </Box>
          </Grid>
         <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
            <Box
                width="100%"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
              <StatBox
                  title="105"
                  subtitle="오늘 입장 고객 수"
                  progress="0.75"
                  increase="+14%"
                  icon={
                    <MeetingRoomIcon
                        sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                  }
              />
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
            <Box
                width="100%"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
              <StatBox
                  title="168"
                  subtitle="전날 입장 고객 수"
                  progress="0.50"
                  increase="+21%"
                  icon={
                    <DoorFrontIcon
                        sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                  }
              />
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
            <Box
                width="100%"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
              <StatBox
                  title="11"
                  subtitle="신규 가입자 수"
                  progress="0.30"
                  increase="+5%"
                  icon={
                    <PersonAddIcon
                        sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                  }
              />
            </Box>
          </Grid>
          <Grid
              xs={12}
              sm={12}
              md={8}
              lg={8}
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid xs={12}>
              <Box backgroundColor={colors.primary[400]}>
                <Box
                    mt="25px"
                    p="0 30px"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                  <Box>
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        color={colors.grey[100]}
                    >
                      입장한 동물 수
                    </Typography>
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        color={colors.greenAccent[500]}
                    >
                      5,698 마리
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton>
                      <DownloadOutlinedIcon
                          sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                      />
                    </IconButton>
                  </Box>
                </Box>
                <Box height="250px" m="-20px 0 0 0">
                  <LineChart isDashboard={true} />
                </Box>
              </Box>
            </Grid>
            <Grid xs={12}>
              <Box backgroundColor={colors.primary[400]} padding="30px">
                <Typography
                    variant="h5"
                    fontWeight="600"
                    sx={{ marginBottom: "1px" }}
                >
                  공원 구역별 복잡도
                </Typography>
                  <Typography
                      variant="h5"
                      fontWeight="600"
                      color={colors.greenAccent[500]}
                      sx={{ marginBottom: "10px" }}
                  >
                      2024.01.09 15:00갱신
                  </Typography>
                <Box height="320px">
                  <ParkInfoTable />
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid xs={12} sm={12} md={4} lg={4} xl={4}>
            <Box
                backgroundColor={colors.primary[400]}
                maxHeight="100vh"
                overflow="auto"
                m="25px 0 0 0"
            >
              <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  color={colors.grey[100]}
                  p="15px"
              >
                <Typography
                    variant="h5"
                    fontWeight="60"
                    color={colors.grey[100]}
                >
                  최근 입장 고객
                </Typography>
              </Box>
              {mockTransactions.map((transaction, i) => {
                return (
                    <Box
                        key={`${transaction}-${i}`}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`4px solid ${colors.primary[500]}`}
                        p="15px"
                    >
                      <Box>
                        <Typography
                            variant="h5"
                            fontWeight="600"
                            color={colors.greenAccent[100]}
                        >
                          {transaction.txId}
                        </Typography>
                        <Typography color={colors.grey[100]}>
                          {transaction.user}
                        </Typography>
                      </Box>
                      <Box color={colors.grey[100]}>{transaction.date}</Box>
                      <Box
                          color={colors.greenAccent[500]}
                          p="5px 10px"
                          borderRadius="4px"
                      >
                        ${transaction.cost}
                      </Box>
                    </Box>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </Box>
  );
};

export default Dashboard;
