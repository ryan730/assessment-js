/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (properties, arr) => {
    const newArr = [...arr];
    newArr.map((item) => {
        properties.map((prop) => {
            if (item[prop]) {
                delete item[prop];
            }
        })
    })
    //console.log('Q1:', properties, newArr, '-', arr);
    return newArr;
};

exports.excludeByProperty = (propertie, arr) => {
    let newArr = [...arr];
    newArr = newArr.filter((item) => {
        return !item[propertie]
    })
    //console.log('Q2:', propertie, newArr, '-', arr);
    return newArr;
};

exports.sumDeep = (arr) => {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        const obj = arr[i];
        const objects = obj.objects || [];
        const num = objects.reduce((total, sum) => {
            return total + sum.val;
        }, 0);
        result.push({
            objects: num
        });
    }
    //console.log('Q3:', result, '-', arr);
    return result;
};

exports.applyStatusColor = (colors, status) => {
    const result = [];
    [...status].map((item) => {
        let color = '';
        Object.keys(colors).find((key) => {
            const it = colors[key]
            const bol = it.includes(item.status);
            if (bol) {
                color = key;
            }
        })
        if (color) {
            result.push({
                ...item,
                color
            });
        }
    })
    //console.log('Q4:', result);
    return result;
};

exports.createGreeting = (fun, msg) => (name) => {
    //console.log('Q5:', name);
    return fun(msg, name)
};

exports.setDefaults = (arg) => (obj) => {
    // console.log('Q6:', { ...arg, ...obj }, '-', obj, '-', arg);
    return {
        ...arg,
        ...obj
    }
};

exports.fetchUserByNameAndUsersCompany = async (name, services) => {
    //console.log('Q7:', name, services);
    const {
        fetchCompanyById,
        fetchStatus,
        fetchUsers
    } = services;

    function errorCallback(e = '') {
        return {
            status: {
                time: new Date().toISOString(),
                ok: false,
                error: e.toString()
            }
        }
    }
    let user;
    let company;
    let status;
    try {
        const getUser = await fetchUsers();
        user = getUser.find((item) => {
            return item.name === name;
        })
        if (user && user.companyId) {
            company = await fetchCompanyById(user.companyId);
            if (company) {
                status = await fetchStatus();
            }
        }
        // console.log('Q7-1:', { company, status, user, });
        if (!user || !company || !status) {
            return errorCallback('');
        }
        return {
            company,
            status,
            user,
        }

    } catch (e) {
        return errorCallback(e);
    }

};