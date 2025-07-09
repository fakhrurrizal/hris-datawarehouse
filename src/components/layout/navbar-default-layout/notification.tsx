// import { queryClient } from '@/utils/lib/react-query/queryClient'
// import { getApi } from '@/utils'
// import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
// import { Badge, BadgeProps, CardActions, alpha, styled, useTheme } from '@mui/material'
// import Card from '@mui/material/Card'
// import CardHeader from '@mui/material/CardHeader'
// import IconButton from '@mui/material/IconButton'
// import List from '@mui/material/List'
// import ListItem from '@mui/material/ListItem'
// import ListItemText from '@mui/material/ListItemText'
// import ListSubheader from '@mui/material/ListSubheader'
// import Button from '@mui/material/Button'
// import Box from '@mui/material/Box'
// import Menu from '@mui/material/Menu'
// import Typography from '@mui/material/Typography'
// import axios from 'axios'
// import dayjs from 'dayjs'
// import { useRouter } from 'next/router'
// import queryString from 'query-string'
// import { useState } from 'react'
// import { toast } from 'react-toastify'
// import Image from 'next/image'

// // const groupByDate = (data: any) => {
// //     return data?.reduce((acc: { [key: string]: any }, item: any) => {
// //         const date = dayjs(item.created_at).locale('id').format('LL'); // Format the date
// //         if (!acc[date]) {
// //             acc[date] = [];
// //         }
// //         acc[date].push(item);

// //         return acc;
// //     }, {});
// // };

// const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
//     '& .MuiBadge-badge': {
//         right: 2,
//         top: 5,
//         border: `1px solid ${theme.palette.background.paper}`,
//         padding: '0 3px',
//     },
// }))

// const Notification = () => {
//     const theme = useTheme()

//     const route = useRouter()

//     // const { data } = useNotification({})

//     const notification_unread = data?.filter(item => item?.status === false)

//     const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

//     const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//         setAnchorEl(event.currentTarget)
//     }

//     const handleClose = () => {
//         setAnchorEl(null)
//     }

//     const [hoverStatus, setHoverStatus] = useState<{ [key: number]: boolean }>({})

//     const open = Boolean(anchorEl)

//     const openAll = () => {
//         handleClose()
//         route.push('/notifications')
//     }

//     const handleMouseEnter = (index: number) => {
//         setHoverStatus(prevStatus => ({
//             ...prevStatus,
//             [index]: true,
//         }))
//     }

//     const handleMouseLeave = (index: number) => {
//         setHoverStatus(prevStatus => ({
//             ...prevStatus,
//             [index]: false,
//         }))
//     }

//     const handleClickRead = async (id: number, path: string, item: any) => {
//         const endpointEdit = queryString.stringifyUrl({
//             url: `${getApi('notification')}/${id}/read`,
//         })
//         if (!item?.status) {
//             try {
//                 await axios.put(`${endpointEdit}`, {
//                     status: true,
//                 })

//                 route.push(path ? path : `/notifications/detail/${id}`)

//                 queryClient.invalidateQueries({ queryKey: ['NOTIFICATION_LIST'] })
//             } catch (error: any) {
//                 toast.error(error?.data?.response?.message)
//             }
//         } else {
//             route.push(path ? path : `/notifications/detail/${id}`)
//         }
//         handleClose()
//     }

//     const handleClickReadAll = async () => {
//         const endpoint = queryString.stringifyUrl({
//             url: `${getApi('notification')}/read/all`,
//         })

//         try {
//             await axios.put(`${endpoint}`)

//             queryClient.invalidateQueries({ queryKey: ['LIST_NOTIFICATIONS'] })
//             queryClient.invalidateQueries({ queryKey: ['NOTIFICATION_LIST'] })
//         } catch (error: any) {
//             toast.error(error?.data?.response?.message)
//         }
//     }

//     // const handleClickReadAll = async () => {
//     //     const endpointReadAll = queryString.stringifyUrl({
//     //         url: `${getApi('notification')}/read-all`,
//     //     });

//     //     try {
//     //         await axios.put(`${endpointReadAll}`, );

//     //       queryClient.invalidateQueries({ queryKey: ["NOTIFICATION_LIST"] });
//     //     } catch (error:any) {
//     //         toast.error(error?.data?.response?.message)
//     //     }
//     //   };

//     // const groupedData = groupByDate(data);

//     return (
//         <>
//             <IconButton onClick={handleClick} aria-label='cart'>
//                 {notification_unread?.length !== 0 ? (
//                     <StyledBadge badgeContent={notification_unread?.length} max={99} showZero color='primary'>
//                         <NotificationsNoneOutlinedIcon color='primary' sx={{ fontSize: 24.5 }} />
//                     </StyledBadge>
//                 ) : (
//                     <NotificationsNoneOutlinedIcon color='primary' sx={{ fontSize: 24.5 }} />
//                 )}
//             </IconButton>
//             {/* <IconButton onClick={handleClick}>
//                 <NotificationsNoneOutlinedIcon color="primary" />
//             </IconButton> */}

//             <Menu
//                 anchorEl={anchorEl}
//                 open={open}
//                 onClose={handleClose}
//                 PaperProps={{
//                     elevation: 0,
//                     sx: {
//                         width: 450,
//                         overflow: 'visible',
//                         filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
//                         mt: 1.5,
//                     },
//                 }}
//                 transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//                 anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//             >
//                 <Card elevation={3}>
//                     <CardHeader
//                         sx={{
//                             paddingBottom: 2,
//                             boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
//                         }}
//                         title={
//                             <Box display='flex' justifyContent='space-between' paddingRight={1}>
//                                 <Typography color='primary' fontSize={17} fontWeight={600}>
//                                     {' '}
//                                     Pemberitahuan
//                                 </Typography>
//                                 {data !== null && (
//                                     <Button onClick={handleClickReadAll} variant='text'>
//                                         Tandai semua sudah dibaca
//                                     </Button>
//                                 )}
//                             </Box>
//                         }
//                     />
//                     <List
//                         sx={({ palette }) => ({
//                             maxHeight: 400,
//                             overflowY: 'auto',
//                             '&::-webkit-scrollbar': {
//                                 width: '5px',
//                             },
//                             '&::-webkit-scrollbar-thumb': {
//                                 backgroundColor: palette.secondary.main,
//                                 borderRadius: '6px',
//                             },
//                             '&::-webkit-scrollbar-thumb:hover': {
//                                 backgroundColor: '#555',
//                             },
//                             '&::-webkit-scrollbar-track': {
//                                 backgroundColor: '#f1f1f1',
//                             },
//                         })}
//                     >
//                         {data !== null ? (
//                             data?.map(item => {
//                                 return (
//                                     <ListItem
//                                         key={item?.id}
//                                         onClick={() => handleClickRead(item?.id, item?.redirect, item)}
//                                         onMouseEnter={() => handleMouseEnter(item?.id)}
//                                         onMouseLeave={() => handleMouseLeave(item?.id)}
//                                         sx={{
//                                             gap: '12px',
//                                             cursor: 'pointer',
//                                             backgroundColor:
//                                                 !item.status && hoverStatus[item?.id]
//                                                     ? alpha(theme.palette.primary.main, 0.3)
//                                                     : !item.status
//                                                       ? alpha(theme.palette.primary.main, 0.2)
//                                                       : hoverStatus[item?.id]
//                                                         ? alpha(theme.palette.primary.main, 0.3)
//                                                         : 'transparent',
//                                             borderRadius: '1px',
//                                             borderLeft: !item.status ? 3.2 : 0,
//                                             borderLeftColor: theme.palette.primary.main,
//                                             borderBottom: 1,
//                                             borderBottomColor: alpha(theme.palette.secondary.main, 0.2),
//                                         }}
//                                     >
//                                         <ListItemText
//                                             primary={item.title}
//                                             secondary={
//                                                 <>
//                                                     <Typography
//                                                         sx={{
//                                                             display: '-webkit-box',
//                                                             WebkitLineClamp: 2,
//                                                             WebkitBoxOrient: 'vertical',
//                                                             overflow: 'hidden',
//                                                             fontSize: '.8em',
//                                                             wordBreak: 'break-word',
//                                                         }}
//                                                         component='span'
//                                                         variant='body2'
//                                                         color='text.primary'
//                                                     >
//                                                         {item?.description?.length > 150
//                                                             ? `${item?.description?.slice(0, 150)}...`
//                                                             : item?.description}
//                                                     </Typography>
//                                                 </>
//                                             }
//                                         />
//                                         <ListSubheader
//                                             disableGutters={true}
//                                             disableSticky={true}
//                                             sx={{
//                                                 fontSize: '0.7em',
//                                                 textAlign: 'right',
//                                                 lineHeight: 1.5,
//                                                 width: '12rem',
//                                             }}
//                                         >
//                                             {dayjs().diff(dayjs(item.created_at), 'day') >= 3
//                                                 ? dayjs(item.created_at).format('DD MMM YYYY')
//                                                 : dayjs(item.created_at).locale('id').fromNow()}
//                                         </ListSubheader>
//                                     </ListItem>
//                                 )
//                             })
//                         ) : (
//                             <>
//                                 <Box
//                                     sx={{
//                                         display: 'flex',
//                                         flexDirection: 'column',
//                                         alignItems: 'center',
//                                         width: '100%',
//                                         justifyContent: 'center',
//                                         height: '100%',
//                                     }}
//                                 >
//                                     <Image src='/images/data-empty.png' alt='data empty' width={120} height={120} />
//                                     <Typography>Data Kosong</Typography>
//                                 </Box>
//                             </>
//                         )}

//                         {/* {Object?.keys(groupedData).length !== 0 ? (
//                             <>
//                                 {Object?.entries(groupedData)?.map(([date, items]: any) => (
//                                     <>
//                                         <ListItem sx={({ palette }) => ({ background: alpha(palette.secondary.main, 0.1), fontSize: 11, borderRadius: "1px" })}>{date}</ListItem>

//                                         {items?.map((item: any,) => (
//                                             <ListItem
//                                                 key={item.id}
//                                                 onClick={() => handleClickRead(item.id, item.path, item)}
//                                                 onMouseEnter={() => handleMouseEnter(item?.id)}
//                                                 onMouseLeave={() => handleMouseLeave(item?.id)}
//                                                 sx={{
//                                                     gap: "12px", cursor: "pointer", backgroundColor: item.status && hoverStatus[item?.id]
//                                                         ? alpha(theme.palette.primary.main, 0.3)
//                                                         : item.status
//                                                             ? alpha(theme.palette.primary.main, 0.2)
//                                                             : hoverStatus[item?.id]
//                                                                 ? alpha(theme.palette.primary.main, 0.3)
//                                                                 : "transparent",
//                                                     borderRadius: "1px",
//                                                 }}
//                                             >
//                                                 <ListItemText
//                                                     primary={item.title}
//                                                     secondary={
//                                                         <>
//                                                             <Typography
//                                                                 sx={{
//                                                                     display: "-webkit-box",
//                                                                     WebkitLineClamp: 2,
//                                                                     WebkitBoxOrient: "vertical",
//                                                                     overflow: "hidden",
//                                                                     fontSize: ".8em",
//                                                                     wordBreak: "break-word",
//                                                                 }}
//                                                                 component="span"
//                                                                 variant="body2"
//                                                                 color="text.primary"
//                                                             >
//                                                                 {item.description}
//                                                             </Typography>
//                                                         </>
//                                                     }
//                                                 />
//                                                 <ListSubheader
//                                                     disableGutters={true}
//                                                     disableSticky={true}
//                                                     sx={{ fontSize: "0.7em", textAlign: "right", lineHeight: 1.5, width: "12rem" }}
//                                                 >
//                                                     {dayjs(item.created_at).locale("id").fromNow()}
//                                                 </ListSubheader>
//                                             </ListItem>
//                                         ))}
//                                     </>
//                                 ))}
//                             </>
//                         ) : (
//                             <Box display="flex" justifyContent="center">
//                                 <Typography>Tidak ada notifikasi</Typography>
//                             </Box>
//                         )} */}
//                     </List>
//                     {data !== null && (
//                         <CardActions sx={{ marginX: '18px', justifyContent: 'end' }}>
//                             <Typography
//                                 sx={({ palette }) => ({
//                                     color: palette.primary.main,
//                                     cursor: 'pointer',
//                                     '&:hover': {
//                                         textDecoration: 'underline',
//                                     },
//                                 })}
//                                 onClick={openAll}
//                             >
//                                 Lihat selengkapnya
//                             </Typography>
//                         </CardActions>
//                     )}
//                 </Card>
//             </Menu>
//         </>
//     )
// }

// export default Notification
