export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "Name",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "age",
    headerName: "Age",
    width: 100,
  },
  {
    field: "phoneNumber",
    headerName: "Phone",
    width: 150,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];

//temporary data
export const userRows = [
  {
    id: 1,
    eventName: "Chicago Volleyball League",
    date: "January 8, 2022 - Sunday, March 13, 2022",
    time: "null",
    image: "https://timviec365.com/pictures/images/event-executive-1.jpg",
    quantity: 100,
    place: "Chicago",
    qrImage: "null",
  },
  {
    id: 2,
    eventName: "Entry Tournament (12U-14U)",
    date: "January 8, 2022 - Sunday, March 13, 2022",
    time: "null",
    image:
      "https://www.smartsurvey.co.uk/wp-content/uploads/event-evaluation.jpg",
    quantity: 100,
    place: "Chicago",
    qrImage: "null",
  },
  {
    id: 3,
    eventName: "2022 Badger Region Power League",
    date: "January 8, 2022 - Sunday, March 13, 2022",
    time: "null",
    image:
      "https://lh5.googleusercontent.com/0ND8od-CwzZLp1HqpYl5nSJRT-txqqw8OqrrCdSFH92zRRkUWkUUiv49yUr4RqH8K1bNN2QYIX9ZFW899eOIc4dWiMJgSNLraMLP_3DYztHwWhLWCXtLGIRIG_gkZ1NUBZ2Dcs4u",
    quantity: 100,
    place: "Chicago",
    qrImage: "null",
  },
  {
    id: 4,
    eventName: "2022 CEVA Power League",
    date: "January 8, 2022 - Sunday, March 13, 2022",
    time: "null",
    image:
      "https://digitalagencynetwork.com/wp-content/uploads/2019/07/b2b-marketing-expo-london-2020-1.jpg",
    quantity: 100,
    place: "Chicago",
    qrImage: "null",
  },
  {
    id: 5,
    eventName: "2022 Windy City PL 12s-18s (League Dates)",
    date: "January 8, 2022 - Sunday, March 13, 2022",
    time: "null",
    image: "https://nmpidigital.com/wp-content/uploads/2016/05/IMG_0826.jpg",
    quantity: 100,
    place: "Chicago",
    qrImage: "null",
  },
  {
    id: 6,
    eventName: "South West Power League",
    date: "January 8, 2022 - Sunday, March 13, 2022",
    time: "null",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmcVIhJD7cZMqcS00z062w-XhQgV2I7zCXEwPBaimvgi_F_qBcVzRxqgZt5AQBNBMGKsw&usqp=CAU",
    quantity: 100,
    place: "Chicago",
    qrImage: "null",
  },
  {
    id: 7,
    eventName: "2022 WCVBA League #1 and #2",
    date: "January 8, 2022 - Sunday, March 13, 2022",
    time: "null",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmcVIhJD7cZMqcS00z062w-XhQgV2I7zCXEwPBaimvgi_F_qBcVzRxqgZt5AQBNBMGKsw&usqp=CAU",
    quantity: 100,
    place: "Chicago",
    qrImage: "null",
  },
  {
    id: 8,
    eventName: "AAU Champions League CONNECTICUT - Girls",
    date: "January 8, 2022 - Sunday, March 13, 2022",
    time: "null",
    image: "https://timviec365.com/pictures/images/event-executive-1.jpg",

    quantity: 100,
    place: "Chicago",
    qrImage: "null",
  },
  {
    id: 9,
    eventName: "PVL Tournament 2 (12U-18U)",
    date: "January 8, 2022 - Sunday, March 13, 2022",
    time: "null",
    quantity: 100,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmcVIhJD7cZMqcS00z062w-XhQgV2I7zCXEwPBaimvgi_F_qBcVzRxqgZt5AQBNBMGKsw&usqp=CAU",
    place: "Chicago",
    qrImage: "null",
  },
  {
    id: 10,
    eventName: "SVC Spring Showcase 13 National",
    date: "January 8, 2022 - Sunday, March 13, 2022",
    time: "null",
    quantity: 100,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmcVIhJD7cZMqcS00z062w-XhQgV2I7zCXEwPBaimvgi_F_qBcVzRxqgZt5AQBNBMGKsw&usqp=CAU",
    place: "Chicago",
    qrImage: "null",
  },
  {
    id: 11,
    eventName: "Geoff Davis | H2 Director's Classic",
    date: "January 8, 2022 - Sunday, March 13, 2022",
    time: "null",
    quantity: 100,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmcVIhJD7cZMqcS00z062w-XhQgV2I7zCXEwPBaimvgi_F_qBcVzRxqgZt5AQBNBMGKsw&usqp=CAU",
    place: "Chicago",
    qrImage: "null",
  },
  {
    id: 12,
    eventName: "2022 AAU Virginia Beach Grand Prix",
    date: "January 8, 2022 - Sunday, March 13, 2022",
    time: "null",
    quantity: 100,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmcVIhJD7cZMqcS00z062w-XhQgV2I7zCXEwPBaimvgi_F_qBcVzRxqgZt5AQBNBMGKsw&usqp=CAU",
    place: "Chicago",
    qrImage: "null",
  },
];
