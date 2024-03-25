export const host = {
  AUTH: process.env.REACT_APP_SOLAR + "/auth",
  DATA: process.env.REACT_APP_SOLAR + "/data",
  CLOUD: process.env.REACT_APP_CLOUD,
};

export const messages = {
  en: {
    temperature: "Temperature",
    description: "Description",
    change: "Edit",
    all: "All",
    account: "Account",
    username: "Username",
    password: "Password",
    email: "Email",
    login: "Login",
    logout: "Logout",
    save_login: "Save login",
    curr_pwd: "Current password",
    pwd: "Change password",
    forgot_pwd: "Forgot password",
    new_pwd: "New password",
    auth_pwd: "Confirm new password",
    register: "Register",
    customOpt: "Customization Options",
    name: "Name",
    master: "Master",
    admin: "Admin",
    user: "User",
    projname: "Project name",
    phone: "Phone number",
    notification: "Notification",
    maintain: "Analytics",
    analytic: "Analytic",
    analyticsList: "List of Analytics",
    dashboard: "Dashboard",
    overview: "Production Overview",
    history: "Historical Production",
    historyInverter: "Historical Inverter",
    projectInfo: "Project information",
    projectStatus: "Plant status",
    projectTotal: "Total plant:",
    projectWarn: "Plant with alerts",
    dataPref: "Data Preferences",
    projData: "Project Data",
    online: "Online",
    offline: "Offline",
    demo: "Shared",
    care: "Watchlist",
    project: "Project",
    total: "Total",
    empty: "Emprty List",
    ruleList: "Rights list",
    newRule: "New Rights",
    device: "Device",
    warn: "Warning",
    configwarn: "Warning Configuration",
    resolve: "Resolved",
    level: "Level",
    warnLevel: "Warning level:",
    openWarnTime: "Warning opening time",
    closeWarnTime: "Warning closing time",
    allowNoti: "Allow Notification",
    offNoti: "Disable Notification",
    monitor: "Monitor",
    report: "Report",
    reportName: "Report Name",
    dailyReport: "Daily Data Report",
    monthlyReport: "Monthly Data Report",
    yearlyReport: "Yearly Data Report",
    totalReport: "Total Data Report",
    dailyReportDesc:
      "View the data of the selected plants in the selected daily range,including plant power generation, subsystem power generation, inverter power generation under plant, etc.",
    monthlyReportDesc:
      "View the data of the selected plants in the selected monthly range,including plant power generation, subsystem power generation, inverter power generation under plant, etc.",
    yearlyReportDesc:
      "View the data of the selected plants in the selected yearly range,including plant power generation, subsystem power generation, inverter power generation under plant, etc.",
    log: "Log",
    logList: "Log List",
    address: "Address",
    coord: "Coordinates",
    longitude: "Longitude",
    latitude: "Latitude",
    location: "Location",
    type: "Type",
    projType: "Project Type",
    reportType: "Report Type",
    household: "Household",
    factory: "Factory",
    electricType: "Type of Electrical System",
    gridType: "Grid-tied System",
    consumptionType: "Self-consumption",
    hybridType: "Hybrid System",
    ESS: "ESS System",
    graph: "Graph",
    productionData: "Production",
    consumptionData: "Consumption",
    consumption: "Consumption",
    dailyConsumption: "Daily Consumption",
    monthlyConsumption: "Monthly Consumption",
    yearlyConsumption: "Yearly Consumption",
    totalConsumption: "Total Consumption",
    grid: "Grid",
    gridData_: "Grid",
    batteryData: "Battery",
    charge: "Charge",
    discharge: "Discharge",
    gridData: "Grid Data",
    tiltAngle: "Tilt Angle",
    setting: "Manage",
    grouprole: "Groups",
    grouproleList: "Groups list",
    roleList: "Groups",
    contact: "Contact",
    onm: "Installation O&M Provider",
    investor: "Investor",
    distributor: "Distributor",
    manufacturer: "Manufacturer",
    role: "Users",
    rule: "Rights",
    partner: "Partner",
    rushhour: "Rush Hour",
    environment: "Environment and Economic Benefits",
    envi: "Environment",
    weather: "Weather",
    temperature: "Temperature",
    temperatureInverter: "Inverter Temperature",
    addr: "Address",
    connect: "Connect",
    status: "Status",
    stateInverter: "Inverter State",
    currency: "Currency",
    unitPrice: "Unit Price",
    totalRevenue: "Total Yields",
    C02: "CO₂ Emissions Reduction",
    cropYield: "Trees Planted",
    tree: "Trees",
    coalSave: "Standard Coal Saved",
    frequency: "Frequency",
    capacity: "Capacity",
    gridfeed: "Grid Feedin",
    purchaseE: "Energy Puchased",
    today: "Today",
    day: "Day",
    month: "Month",
    year: "Year",
    ordinalNumber: "No.",
    dailyOutput: "Daily Production",
    monthOutput: "Monthly Production",
    yearOutput: "Yearly Production",
    totalOutput: "Total Production",
    inCapacity: "Installed Capacity",
    electricGen: "Electricity Generation",
    yearly: "Yearly Production",
    monthly: "Monthly Production",
    dailygrid:"Daily Grid",
    dailyproduction: "Daily Production",
    dailyconsumption: "Daily Consumption",
    dailygridin:"Daily grid feed-in",
    dailygridout: "Daily energy purchase",
    dailybatteryin: "Daily energy charged",
    dailybatteryout: "Daily energy discharged",
    daily: "Daily Production",
    ogLog: "Logger connected",
    low: "Low",
    medium: "Medium",
    high: "High",
    lowMess: "Notification 60 Minutes After Error Occurrence",
    medMess: "Notification 15 Minutes After Error Occurrence",
    highMess: "Immediate Notification",
    production: "Production",
    taskSeq: "Task Sequence",
    inProgress: "In Progress",
    complete: "Complete",
    power: "Power Normalized",
    runtime: "Operating Time",
    operator: "Operators",
    responseTime: "Response Time",
    lastupdate: "Last update at",
    createBy: "Create by",
    createdate: "Create date",
    createAccount: "Add user",
    createNew: "Create",
    createUser: "Create User",
    groupName: "Group name",
    ruleName: "Rights name",
    ruleOptions: "Rights permissions ",
    createNewGroup: "New Group",
    groupInfo: "Group Information",
    grouproleInfo: "Enter information for a new group and its functions",
    editGroup: "Edit group",
    createAnal: "New Analytic",
    createReport: "New Report",
    limitdate: "Date Limit",
    join: "Join Code",
    errcode: "Error Code",
    errdetai: "Error detail",
    cause: "Caused by",
    solution: "Solution",
    edit: "Edit",
    edits: "Edit",
    editPassword: "Edit password",
    delete: "Delete",
    config: "Configuration",
    method: "Method ",
    update: "Update",
    remove: "Remove",
    delDevice: "Delete this device",
    delWarn: "Delete this warning",
    delAccount: "Delete this account",
    delGroupRole: "Delete this GroupRole",
    delRule: "Delete this Rule",
    addProj: "New Project",
    save: "Save",
    add: "+Add",
    ADD: "Add",
    export: "Export",
    cancel: "Cancel",
    confirm: "Confirm",
    choosePara: "Select Parameters",
    minimize: "Minimize",
    quit: "Quit",
    next: "Next",
    required: "Required Field",
    dataUpload: "Data Uploading Period",
    signalStrength: "Signal Strength",
    dataAcquisition: "Data Acquisition Period",
    moduleMac: "Module MAC address",
    maxDevices: "Max number of Connected Devices",
    basicInfo: "Basic Information",
    versionInfo: "Version Information",
    systemInfo: "System Information",
    yieldInfo: "Yield Information",
    ownerInfo: "Owner Information",
    registerInfo: "Registration Information",
    operationInfo: "Operation Information",
    moduleVersion: "Module Version No",
    masterVersion: "Software master version",
    viceVersion: "Software vice version",
    hmiVersion: "HMI version",
    voltage: "Voltage",
    current: "Current",
    powerFactor: "Power",
    frequencyInv: "Frequency",
    ElectricityGeneration: "Electricity Generation",
    initialization: "Initialization",
    wait: "Waiting",
    gridconnection: "Grid Connection",
    failure: "Failure",
    burn: "Burn",
    offgrid: "Off Grid",
    businessModel: "Business Model",
    businessname: "Business Name",
    businesstype: "Business Type",
    area: "Area",
    contactName: "Contact Name",
    companyName: "Company Name",
    imgInfo: "Avatar",
    chooseImg: "Select Picture",
    enter: "Enter ",
    enterPr: " Enter project...",
    enterDev: " Enter device information...",
    enterLogger: " Enter logger info...",
    enterInverter: " Enter inverter info...",
    enterType: "Enter device type...",
    enterCode: "Enter device code...",
    enterWarn: "Enter warning name..",
    enterName: "Enter account name...",
    enterInfo: "Enter information...",
    enterPara: "Enter your parameter...",
    row: "Total Row",
    to: "To",
    at: "at",
    alert: "Alert",
    noAlert: "No Alert",
    notice: "Notice",
    success: "Success",
    fail: "Fail",
    showAll: "Show All",
    loginWith: "Login as:",
    receiveBy: "Recevied by :",
    chooseDevice: "Please select a device to display",
    delPlant: "Are you sure want to delete this project :",
    delWarnmess: "Are you sure want to delete this warning?",
    delreportmess: "Are you sure want to delete this report?",
    delaccountmess: "Are you sure want to delete this account?",
    delDevicemess: "Are you sure want to delete this device?",
    delgroupmess: "Are you sure want to delete this group role?",
    delrulemess: "Are you sure want to delete this rule?",
    deleteDenied: "You do not have permission to delete this master",
    remindAlert: "Please check this error!",
    accountLockAlert:
      "Your account is currently locked. Please contact the administrator to reactivate it!",
    alert_0: "Username or password is incorrect!",
    alert_1: "Password changed successfully",
    alert_2: "Your link has expired, please try again!",
    alert_3: "You may have entered the wrong Email, please try again!",
    alert_4: "This password has been used, try using a different password!",
    alert_5: "Your password do not match!",
    alert_6: "Setup successfully!",
    alert_7: "Setup unsuccessful!",
    alert_8: "Please access your Email for confirmation!!",
    alert_9: "Sign up successfully!",
    alert_10:
      "This username has been used, please try using a different username!",
    alert_11: "This email has been used, please try using a different email!",
    alert_12: "OTP is incorrect!",
    alert_13: "Send OTP successfully!",
    alert_14: "Can't send OTP!",
    alert_15: "Please enter the correct Email!",
    alert_16: "The join code you entered does not exist!",
    alert_17: "Please enter all information!",
    alert_18: "The verification code you entered does not match!",
    alert_19: "Address undefined!",
    alert_20: "You can not change role on master!",
    alert_21: "Save rule successfully!",
    alert_22: "Please enter all the required field",
    alert_23: "Delete role successfully!",
    alert_24: "Delete project successfully!",
    alert_25: "Delete device successfully!",
    alert_26: "Unable to delete the device, format error.",
    alert_27: "Unable to delete the device, system error.",
    alert_28: "Delete warning successfully!",
    alert_29: "Add project successfully!",
    alert_30: "Your project has been updated successfully!",
    alert_31: "Create group role successfully!",
    alert_32: "New device added successfully!",
    alert_33: "Format error!",
    alert_34: "Device not found!",
    alert_35: "Thís device already exists!",
    alert_36: "System error!",
    alert_37: "The user has been created!",
    alert_38: "User not found!",
    alert_39: "User already in the group",
    alert_40: "Create new report successfully!",
    alert_41: "Update report successfully!",
    alert_42: "Delete report successfully!",
    alert_43: "Update account successfully!",
    alert_44: "Update account unsuccessful!",
    alert_45: "Delete account successfully!",
    alert_46: "Delete account unsuccessful!",
    alert_47: "Please enter a value in the filter.",
    E01: "Overheating level 1",
    E02: "Overheating level 2",
    E03: "Overload",
    sologon: "Energy solution platform",
    version: "Version",
    previous: "Back",
    unknown: "--",
    active: "Active",
    modify: "Modify",
    reportprojectitem: "Report project fields",
    purchasedelectricity: "Purchased electricity",
    inchargeelectricity: "Incharged electricity",
    dischargedelectricity: "Discharged electricity",
    weatherinfo: "Weather information",
    kWhonkWp: "kWh/kWp",
    totalall: "Total Production",
    environment1: "Standard Coal Saved: The amount of coal needed to run the generator produces a total number of kWh of electricity equivalent to the PV system generated.",
    environment2: "Trees Planted:The number of trees needed to be planted to absorb all the CO2 emitted when producing electricity.",
    environment3: "CO₂ Emission Reduction = 0.7221*Total Production, the CO2 emission data announced by the Department of Climate Change (2020 is 0.7221 tCO2/MWh",
    environment4: "Total Yields = unit price * Total production",
    overview1: "1. Power generation ratio is an important parameter to evaluate the power generation ability of a solar energy system.",
    overview2: "2. Power generation ratio = Power generation/installed capacity.",
    overview3: "3. For example: The power generation ratio is 80%, which means the system is generating power at 80% of its rated Power generation (installed capacity).",
  },
  vi: {
    temperature: "Nhiệt độ",
    description: "Mô tả",
    all : "Tất cả",
    account: "Tài khoản",
    username: "Tên tài khoản",
    password: "Mật khẩu",
    email: "Email",
    login: "Đăng nhập",
    logout: "Đăng xuất",
    save_login: "Lưu đăng nhập",
    curr_pwd: "Mật khẩu hiện tại",
    pwd: "Đặt lại mật khẩu",
    forgot_pwd: "Quên mật khẩu",
    new_pwd: "Mật khẩu mới",
    auth_pwd: "Xác nhận mật khẩu",
    register: "Đăng ký tài khoản",
    customOpt: "Tùy chọn thông tin",
    name: "Tên",
    master: "Quản lý",
    admin: "Quản trị viên",
    user: "Người dùng",
    projname: "Tên dự án",
    phone: "Số điện thoại",
    notification: "Thông báo",
    dashboard: "Bảng điều khiển",
    maintain: "Vận hành và bảo trì",
    analytic: "Phân tích",
    analyticsList: "Danh sách mẫu phân tích",
    overview: "Tổng quan dữ liệu phát điện",
    history: "Lịch sử phát điện",
    historyInverter: "Lịch sử biến tần",
    projectInfo: "Thông tin dự án",
    projectStatus: "Trạng thái dự án",
    projectTotal: "Tổng số dự án:",
    projectWarn: "Dự án có cảnh báo",
    dataPref: "Tùy chọn dữ liệu",
    projData: "Dữ liệu dự án",
    online: "Trực tuyến",
    offline: "Ngoại tuyến",
    demo: "Chia sẻ",
    care: "DS Theo dõi",
    project: "Dự án",
    total: "Tổng",
    empty: "Danh sách trống",
    ruleList: "Danh sách phân quyền",
    newRule: "Tạo quyền mới",
    device: "Thiết bị",
    warn: "Cảnh báo",
    configwarn: "Cài đặt cảnh báo",
    resolve: "Đã khắc phục",
    level: "Mức độ",
    warnLevel: "Mức độ cảnh báo:",
    openWarnTime: "Thời gian mở cảnh báo",
    closeWarnTime: "Thời gian dóng cảnh báo",
    allowNoti: "Cho phép thông báo",
    offNoti: "Tắt thông báo",
    monitor: "Giám sát",
    report: "Báo cáo",
    reportName: "Tên báo cáo",
    dailyReport: "Báo cáo dữ liệu hằng ngày",
    monthlyReport: "Báo cáo dữ liệu theo tháng",
    yearlyReport: "Báo cáo dữ liệu theo năm",
    totalReport: "Báo cáo dữ liệu tổng",
    dailyReportDesc:
      "Xem dữ liệu các nhà máy được chọn trong khoảng thời gian hằng ngày, gồm công suất phát điện của nhà máy, công suất phát điện của hệ thống con, công suất phát điện của biến áp trong nhà máy,...",
    monthlyReportDesc:
      "Xem dữ liệu các nhà máy được chọn trong khoảng thời gian theo tháng, gồm công suất phát điện của nhà máy, công suất phát điện của hệ thống con, công suất phát điện của biến áp trong nhà máy,...",
    yearlyReportDesc:
      "Xem dữ liệu các nhà máy được chọn trong khoảng thời gian theo năm, gồm công suất phát điện của nhà máy, công suất phát điện của hệ thống con, công suất phát điện của biến áp trong nhà máy,...",
    log: "Nhật ký",
    logList: "Danh sách nhật ký",
    address: "Địa chỉ",
    coord: "Tọa độ",
    longitude: "Kinh độ",
    latitude: "Vĩ độ",
    location: "Vị trí",
    type: "Loại",
    projType: "Loại dự án",
    reportType: "Loại báo cáo",
    household: "Dân dụng",
    factory: "Nhà máy",
    electricType: "Loại hệ thống điện",
    gridType: "Hệ thống hòa lưới",
    consumptionType: "Hệ thống hòa lưới bám tải",
    hybridType: "Hệ thống lưu trữ hybrid",
    ESS: "Hệ thống lưu trữ năng lượng ESS",
    graph: "Đồ thị",
    productionData: "Sản lượng phát",
    consumptionData: "Tải tiêu thụ",
    consumption: "Công suất tiêu thụ",
    dailyConsumption: "Tiêu thụ theo ngày",
    monthlyConsumption: "Tiêu thụ theo tháng",
    yearlyConsumption: "Tiêu thụ theo năm",
    totalConsumption: "Tổng tiêu thụ",
    grid: "Lưới điện",
    gridData_: "Công suất",
    batteryData: "Ắc quy",
    charge: "Sạc",
    discharge: "Xả",
    gridData: "Dữ liệu trên lưới",
    tiltAngle: "Góc Nghiêng",
    setting: "Quản lý",
    roleList: "Danh sách người dùng",
    grouprole: "Nhóm người dùng",
    grouproleList: "Danh sách nhóm người dùng",
    contact: "Liên hệ",
    onm: "Nhà cung cấp O&M",
    investor: "Đầu tư",
    distributor: "Nhà phân phối",
    manufacturer: "Nhà sản xuất",
    role: "Người dùng",
    rule: "Quyền",
    partner: "Đối tác",
    rushhour: "Giờ nắng đỉnh",
    environment: "Môi trường và lợi ích kinh tế",
    envi: "Môi trường",
    weather: "Thời tiết",
    temperature: "Nhiệt độ",
    temperatureInverter: "Nhiệt độ biến tần",
    addr: "Địa chỉ",
    connect: "Kết nối",
    status: "Trạng thái",
    stateInverter: "Trạng thái biến tần",
    currency: "Tiền tệ",
    totalRevenue: "Tổng doanh thu",
    unitPrice: "Đơn giá",
    C02: "Lượng CO₂ tiết giảm",
    cropYield: "Sản lượng cây trồng",
    tree: "cây",
    coalSave: "Lượng than tiết kiệm",
    frequency: "Tần suất",
    capacity: "Dung lượng",
    gridfeed: "Lấy vào",
    purchaseE: "Bán ra",
    Input: "",
    today: "Hôm nay",
    day: "Ngày",
    month: "Tháng",
    year: "Năm",
    ordinalNumber: "STT",
    dailyOutput: "Sản lượng ngày",
    monthOutput: "Sản lượng tháng",
    yearOutput: "Sản lượng năm",
    totalOutput: "Tổng sản lượng",
    inCapacity: "Công suất lắp đặt",
    electricGen: "Sản lượng điện phát",
    yearly: "Sản lượng điện năm",
    monthly: "Sản lượng điện tháng",
    daily: "Sản lượng điện ngày",
    dailyproduction: "Sản lượng ngày",
    dailyconsumption: "Tiêu thụ ngày",
    dailygridin:"Sản lượng nạp lưới ngày",
    dailygridout: "Sản lượng mua ngày",
    dailybatteryin: "Năng lượng sạc ngày",
    dailybatteryout: "Năng lượng xả ngày",
    ogLog: "Logger kết nối",
    low: "Thấp",
    medium: "Vừa",
    high: "Cao",
    lowMess: "Thông báo 60 phút sau khi xảy ra lỗi",
    medMess: "Thông báo 15 phút sau khi xảy ra lỗi",
    highMess: "Thông báo ngay lập tức khi xảy ra lỗi",
    production: "Công suất phát",
    taskSeq: "Trình tự công việc",
    inProgress: "Đang thực hiện",
    complete: "Hoàn thành",
    power: "Công suất phát",
    runtime: "Thời gian hoạt động",
    operator: "Người vận hành",
    responseTime: "Thời gian phản hồi",
    lastupdate: "Lần cập nhật cuối",
    createdate: "Ngày tạo",
    createNew: "Tạo mới",
    createNewGroup: "Tạo nhóm mới",
    groupInfo: "Thông tin nhóm",
    grouproleInfo: "Nhập thông tin nhóm mới và các chức năng trong nhóm",
    change: "Chỉnh sửa",
    edits: "Thay đổi",
    edit: "Tùy chỉnh",
    editPassword: "Đổi mật khẩu",
    delete: "Xóa",
    editGroup: "Chỉnh sửa nhóm",
    createAnal: "Tạo mẫu phân tích",
    createReport: "Tạo mẫu báo cáo",
    createAccount: "Thêm người dùng",
    createUser: "Thêm nhân viên",
    createBy: "Tạo bởi",
    limitdate: "Giới hạn ngày",
    join: "Mã truy cập",
    errcode: "Mã lỗi",
    errdetai: "Chi tiết mã lỗi",
    cause: "Nguyên nhân",
    solution: "Biện pháp",
    config: "Cấu hình",
    method: "Phương thức",
    update: "Cập nhật",
    remove: "Gỡ",
    delDevice: "Xóa thiết bị",
    delAccount: "Xóa người dùng",
    delWarn: "Xóa mẫu cảnh báo",
    delGroupRole: "Xóa nhóm người dùng",
    delRule: "Xóa phân quyền người dùng",
    addProj: "Thêm dự án",
    save: "Lưu",
    add: "Thêm",
    ADD: "Thêm",
    export: "Xuất báo cáo",
    cancel: "Hủy",
    confirm: "Xác nhận",
    choosePara: "Chọn thông số",
    minimize: "Thu gọn",
    quit: "Thoát",
    next: "Tiếp theo",
    required: "Bắt buộc điền",
    dataUpload: "Thời gian tải lên dữ liệu",
    signalStrength: "Cường độ tín hiệu",
    dataAcquisition: "Chu kỳ thu thập dữ liệu",
    moduleMac: "Địa chỉ MAC của mô-đun",
    maxDevices: "Số lượng thiết bị kết nối tối đa",
    basicInfo: "Thông tin cơ bản",
    versionInfo: "Thông tin phần mềm",
    systemInfo: "Thông tin hệ thống",
    yieldInfo: "Thông tin sản lượng",
    ownerInfo: "Thông tin người sở hữu",
    registerInfo: "Thông tin đăng ký",
    operationInfo: "Thông tin dữ liệu",
    moduleVersion: "Số phiên bản chứng nhận",
    masterVersion: "Phiên bản phần mềm chính",
    viceVersion: "Phiên bản phần mềm phụ",
    hmiVersion: "Phiên bản HMI",
    voltage: "Điện áp",
    current: "Dòng điện",
    powerFactor: "Công suất",
    frequencyInv: "Tần suất",
    ElectricityGeneration: "Thông số phát điện",
    initialization: "Khởi tạo",
    wait: "Đang kiểm tra",
    gridconnection: "Kết nối lưới",
    failure: "Lỗi",
    burn: "Sự cố",
    offgrid: "Mất lưới",
    businessModel: "Mô hình kinh doanh",
    businessname: "Tên kinh doanh",
    businesstype: "Loại",
    area: "Khu vực",
    contactName: "Người liên hệ",
    companyName: "Tên doanh nghiệp",
    groupName: "Tên nhóm",
    ruleName: "Tên phân quyền",
    ruleOptions: "Tùy chọn cấp quyền",
    imgInfo: "Ảnh đại diện",
    chooseImg: "Chọn ảnh",
    enter: "Nhập ",
    enterPr: " Nhập tên dự án...",
    enterDev: " Nhập thông tin thiết bị...",
    enterLogger: " Nhập thông tin logger...",
    enterInverter: " Nhập thông tin inverter...",
    enterType: "Nhập loại thiết bị...",
    enterCode: "Nhập mã thiết bị...",
    enterWarn: " Nhập tên cảnh báo...",
    enterName: "Nhập tên tài khoản...",
    enterInfo: "Nhập thông tin...",
    enterPara: "Nhập thông số...",
    row: "Số hàng",
    to: "đến",
    at: "tại",
    notice: "Chú ý",
    alert: "Cảnh báo",
    noAlert: "Không có cảnh báo",
    success: "Thành công",
    fail: "Thất bại",
    showAll: "tất cả",
    receiveBy: "Người nhận :",
    loginWith: "Đăng nhập bởi:",
    chooseDevice: "Vui lòng chọn thiết bị bạn cần để hiển thị",
    delPlant: "Bạn có chắc muốn xóa dự án :",
    delWarnmess: "Bạn có chắc muốn xóa mẫu cảnh báo này không?",
    delreportmess: "Bạn có chắc muốn xóa mẫu báo cáo này không?",
    delDevicemess: "Bạn có chắc muốn xóa thiết bị này không?",
    delaccountmess: "Bạn có chắc muốn xóa người dùng này không?",
    delgroupmess: "Bạn có chắc muốn xóa nhóm người dùng này không?",
    delrulemess: "Bạn có chắc muốn xóa phân quyền người dùng này không?",
    deleteDenied: "Bạn không thể xóa phân quyền Master",
    remindAlert: "Vui lòng kiểm tra!",
    accountLockAlert:
      "Tài khoản của bạn hiện đang bị khoá vui lòng liên hệ quản trị viên để kích hoạt lại!",
    alert_0: "Tài khoản hoặc mật khẩu không đúng!",
    alert_1: "Đổi mật khẩu thành công!",
    alert_2: "Link đã hết hiệu lực, bạn vui lòng thực hiện lại!",
    alert_3: "Email không đúng, bạn vui lòng thực hiện lại!",
    alert_4: "Mật khẩu này đã được sử dụng, bạn vui lòng thực hiện lại!",
    alert_5: "Mật khẩu không khớp!",
    alert_6: "Thiết lập thành công!",
    alert_7: "Thiết lập không thành công, vui lòng thử lại!",
    alert_8: "Bạn vui lòng truy cập vào Email của bạn và xác nhận!",
    alert_9: "Dăng ký thành công!",
    alert_10: "Tài khoản hoặc email đã được sử dụng!",
    alert_11: "Email này đã tồn tại!",
    alert_12: "Mã OTP không đúng!",
    alert_13: "Mã OTP gửi thành công!",
    alert_14: "Khổng thể gửi mã, vui lòng kiểm tra lại!",
    alert_15: "Khổng thể gửi mã, vui lòng nhập Email!",
    alert_16: "Mã truy cập không tồn tại!",
    alert_17: "Vui lòng nhập đầy đủ thông tin!",
    alert_18: "Mật khẩu xác nhận không khớp!",
    alert_19: "Địa chỉ không xác định!",
    alert_20: "Không thể thay đổi phân quyền này !",
    alert_21: "Cập nhật thành công phân quyền !",
    alert_22: "Vui lòng điền đầy đủ thông tin!",
    alert_23: "Xóa nguời dùng thành công!",
    alert_24: "Xóa dự án thành công!",
    alert_25: "Xóa thiết bị thành công!",
    alert_26: "Không thể xóa thiết bị, lỗi định dạng.",
    alert_27: "Không thể xóa thiết bị, lỗi hệ thống.",
    alert_28: "Xóa mẫu cảnh báo thành công!",
    alert_29: "Dự án đã được thêm thành công!",
    alert_30: "Dự án đã được sửa thành công!",
    alert_31: "Tạo nhóm người dùng thành công!",
    alert_32: "Thiết bị được thêm thành công",
    alert_33: "Lỗi định dạng!",
    alert_34: "Không tìm thấy thiết bị!",
    alert_35: "Thiết bị đã tồn tại!",
    alert_36: "Hệ thống lỗi!",
    alert_37: "Người dùng được thêm thành công!",
    alert_38: "Không tìm thấy người dùng, vui lòng kiểm tra lại!",
    alert_39: "Người dùng này đã tồn tại trong nhóm!",
    alert_40: "Tạo mới báo cáo thành công",
    alert_41: "Cập nhật báo cáo thành công!",
    alert_42: "Xóa báo cáo thành công!",
    alert_43: "Cập nhật tài khoản thành công!",
    alert_44: "Cập nhật tài khoản không thành công!",
    alert_45: "Xóa tài khoản thành công!",
    alert_46: "Xóa tài khoản không thành công!",
    alert_47: "Vui lòng nhập giá trị vào bộ lọc.",
    E01: "Lỗi quá nhiệt mức 1",
    E02: "Lỗi quá nhiệt mức 2",
    E03: "Lỗi quá tải",
    version: "Phiên bản",
    sologon: "Nền tảng giải pháp năng lượng",
    previous: "Quay lại",
    unknown: "--",
    active: "Phân quyền cấp thấp",
    modify: "Chỉnh sửa",
    reportprojectitem: "Các hạng mục trong trang khởi tạo dự án",
    purchasedelectricity: "Điện năng mua",
    inchargeelectricity: "Điện năng sạc",
    dischargedelectricity: "Điện năng xả",
    weatherinfo: "Thông tin thời tiết",
    kWhonkWp: "kWh/kWp",
    totalall: "Tổng sản lượng điện",
    environment1: "Lượng than tiết kiệm: Khối lượng than cần để có thể chạy máy phát điện tạo ra tổng số kWh điện tương đương hệ PV phát ra.",
    environment2: "Sản lượng cây trồng: Số cây trồng cần trồng để hấp thụ hết số CO2 phát thải khi sản xuất điện.",
    environment3: "Lượng CO2 tiết giảm = 0,7221 * Sản lượng điện phát, dữ liệu phát thải CO2 lưới điện do Cục biến đổi khí hậu thông báo (năm 2020 là 0,7221 tCO2/MWh).",
    environment4: "Tổng doanh thu = đơn giá * Tổng sản lượng phát.",
    overview1: "1. Tỉ số phát điện là 1 thông số quan trọng để đánh giá khả năng phát điện của hệ thống năng lượng mặt trời.",
    overview2: "2. Tỉ số phát điện = Công suất phát/công suất lắp đặt.",
    overview3: "3. Ví dụ: Tỉ số phát điện là 80%, nghĩa là hệ thống đang phát điện ở mức 80% công suất định mức (công suất lắp đặt).",
  },
};
