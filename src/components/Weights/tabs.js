import React from 'react'
import Taxonomy from './Taxonomy'
import TopRanking from './TopRanking'

import WeightTab from './WeightTab'

const renderPortfolioPresentation = (isExist, data, nameParam, isUserWeights) => {
    return <WeightTab isExist={isExist} data={data} nameParam={nameParam} isUserWeights={isUserWeights} />
}

const renderTopRanking = (isExist, data, nameParam, isUserWeights) => {
    return <TopRanking isExist={isExist} data={data} nameParam={nameParam} isUserWeights={isUserWeights} />
}

const renderRetailers = (isExist, data, nameParam, isUserWeights) => {
    return <WeightTab isExist={isExist} data={data} nameParam={nameParam} isUserWeights={isUserWeights} />
}

const renderTotalPds = (isExist, data, nameParam, isUserWeights) => {
    return <WeightTab isExist={isExist} data={data} nameParam={nameParam} isUserWeights={isUserWeights} />
}

const renderPerfectProduct = (isExist, data, nameParam, isUserWeights) => {
    return <WeightTab isExist={isExist} data={data} nameParam={nameParam} isUserWeights={isUserWeights} />
}

const renderBestPlacement = (isExist, data, nameParam, isUserWeights) => {
    return <WeightTab isExist={isExist} data={data} nameParam={nameParam} isUserWeights={isUserWeights} />
}

const renderTaxonomy = (isExist, data, nameParam, isUserWeights) => {
    return <Taxonomy isExist={isExist} data={data} nameParam={nameParam} isUserWeights={isUserWeights} />
}

export const weightsTabs = [
    { title: 'Portfolio Presentation', nameParam: 'portfolioPresentation', component: renderPortfolioPresentation},
    { title: 'Top Ranking', nameParam: 'topRanking', component: renderTopRanking },
    { title: 'Retailers', nameParam: 'retailers', component: renderRetailers },
    { title: 'Total Pds', nameParam: 'totalPds', component: renderTotalPds },
    { title: 'Perfect Product', nameParam: 'perfectProduct', component: renderPerfectProduct },
    { title: 'Best Placement', nameParam: 'bestPlacement', component: renderBestPlacement },
    { title: 'Taxonomy', nameParam: 'taxonomy', component: renderTaxonomy },
]