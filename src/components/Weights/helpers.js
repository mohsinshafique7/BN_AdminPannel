export const buildObjectСommon = (initialData) => {
    const data = initialData.map((itemObj, itemIndex) => {
        const object = {}
        Object.assign(object, { [`manufacture_${itemIndex}`]: itemObj.manufacture })
        for (const property in itemObj.value) {
            Object.assign(object, { [`${property}_${itemIndex}`]: itemObj.value[property] })
        }
        return object
    })

    const values = {}
    data.forEach(item =>  Object.assign(values, item) )

    return values
}

export const buildObjectRetailers = (initialData) => {
    const data = initialData.map((itemObj, itemIndex) => {
        const object = {}
        Object.assign(object, { [`manufacture_${itemIndex}`]: itemObj.manufacture })

        itemObj.retailers.forEach(item =>  Object.assign(object, { [`${item.name}_${itemIndex}`]: item.value }) )
        
        return object
    })

    const values = {}
    data.forEach(item =>  Object.assign(values, item) )

    return values
}

export const buildObjectPds = (initialData) => {
    const values = {}
    initialData.forEach(item =>  Object.assign(values, item) )

    return values
}

export const buildObjectRanking = (initialData) => {
    const data = initialData.map((itemObj, itemIndex) => {
        const object = {}
        Object.assign(object, { [`manufacture_${itemIndex}`]: itemObj.manufacture })
        
        for (const property in itemObj.value) {
            if(!Array.isArray(itemObj.value[property])) {
                Object.assign(object, { [`${property}_${itemIndex}_value`]: itemObj.value[property] })
            } else {
                itemObj.value[property].forEach((item, index) =>  
                     Object.assign(object, { [`${item.name}_${itemIndex}_${property}_${index}`]: item.value }) 
                )
            }
        }
        return object
    })

    const values = {}
    data.forEach(item =>  Object.assign(values, item) )

    return values
}

export const buildObjectTaxonomy = (initialData) => {
    const data = initialData.map((itemObj, itemIndex) => {
        const object = {}
        Object.assign(object, { [`manufacture_${itemIndex}`]: itemObj.manufacture })
        Object.assign(object, { [`topLevel_${itemIndex}`]: itemObj.value.topLevel })

        itemObj.value.locations.forEach((location, index) => {
            for (const property in location) {
                Object.assign(object, { [`${property}_${itemIndex}_${index}`]: location[property] })
            }
        })
        return object
    })

    const values = {}
    data.forEach((item, index) =>  Object.assign(values, item) )

    return values
}

export const sendFormСommon = (nameParam, lengthArray, values) => {
    const data = {
        [nameParam]: []
    }

    for (let i = 0; i < lengthArray; i++) {
        data[nameParam].push({ "value": {} })
    }
      
    Object.keys(values).forEach(value => {
        if(value.split('_')[0] === 'manufacture') {
            Object.assign(data[nameParam][value.split('_')[1]], { [value.split('_')[0]]: values[value] })
        } else {
            Object.assign(data[nameParam][value.split('_')[1]].value, { [value.split('_')[0]]: Number(values[value]) })
        }
    })

    return data
}

export const sendFormRetailers = (nameParam, lengthArray, values) => {
    const data = {
        [nameParam]: []
    }

    for (let i = 0; i < lengthArray; i++) {
        data[nameParam].push({ "retailers": [] })
    }
      
    Object.keys(values).forEach(value => {
        if(value.split('_')[0] === 'manufacture') {
            Object.assign(data[nameParam][value.split('_')[1]], { [value.split('_')[0]]: values[value] })
        } else {
            data[nameParam][value.split('_')[1]].retailers.push({ name: value.split('_')[0], value: Number(values[value]) })
        }
    })

    return data
}

export const sendFormPds = (nameParam, values) => {
    const data = {
        [nameParam]: {}
    }

    Object.keys(values).forEach(value => {
        Object.assign(data[nameParam], { [value]: Number(values[value]) })
      
    })

    return data
}

export const sendFormRanking = (nameParam, lengthArray, values) => {
    const data = {
        [nameParam]: []
    }

    for (let i = 0; i < lengthArray; i++) {
        data[nameParam].push({ "value": { "search": [], "aisle": [], "shelf": [] } })
    }
      
    Object.keys(values).forEach(value => {
        if(value.split('_')[0] === 'manufacture') {
            Object.assign(data[nameParam][value.split('_')[1]], { [value.split('_')[0]]: values[value] })
        } else {
            if(value.split('_')[2] === 'value') {
                Object.assign(data[nameParam][value.split('_')[1]].value, { [value.split('_')[0]]: Number(values[value]) })
            } else {
                data[nameParam][value.split('_')[1]].value[value.split('_')[2]].push({ 'name': value.split('_')[0], 'value': Number(values[value]) })
            }
        }
    })

    return data
}

export const sendTaxonomy = (nameParam, lengthArray, values) => {
    let data = {
        [nameParam]: []
    }

    for (let i = 0; i < lengthArray; i++) {
        data[nameParam].push({ "value": { "locations": [] } })
    }
      
    Object.keys(values).forEach(value => {
        if(value.split('_')[0] === 'manufacture') {
            Object.assign(data[nameParam][value.split('_')[1]], { [value.split('_')[0]]: values[value] })
        } else {
            if(value.split('_')[0] === 'topLevel') {
                Object.assign(data[nameParam][value.split('_')[1]].value, { [value.split('_')[0]]: Number(values[value]) })
            }
        }
    })

    let obj = [];
    Object.keys(values).forEach(value => {
        if(value.split('_')[0] !== 'manufacture' && value.split('_')[0] !== 'topLevel') {
            let splitted = value.split('_');
            
            if(!obj[Number(splitted[1])]) obj[Number(splitted[1])] = [];
            if(!obj[Number(splitted[1])][Number(splitted[2])]) obj[Number(splitted[1])][Number(splitted[2])] = {};
            let val = values[value];
            if(splitted[0] === 'level') val = Number(val);
            obj[Number(splitted[1])][Number(splitted[2])][splitted[0]] = val;
        }
    })

    data.taxonomy.forEach((ob, index) => {
        let locations  = [];
        Object.keys(obj[index]).forEach(item => {
            locations.push(obj[index][item])
        });
        ob.value.locations = locations;
    })

    return data
}