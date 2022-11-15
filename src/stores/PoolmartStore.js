import Immutable from "immutable";
import { createStore } from 'solid-js/store';
//import {ChainStore} from "bitsharesjs";
//import PoolmartActions from "actions/PoolmartActions";

/*
    this.bindListeners({
        onGetLiquidityPools: PoolmartActions.GET_LIQUIDITY_POOLS,
        onGetLiquidityPoolsByShareAsset:
            PoolmartActions.GET_LIQUIDITY_POOLS_BY_SHARE_ASSET,
        onResetLiquidityPools: PoolmartActions.RESET_LIQUIDITY_POOLS,
        onGetLiquidityPoolsAccount:PoolmartActions.GET_LIQUIDITY_POOLS_ACCOUNT
    });
*/

const [poolmartStore, setPoolmartStore] = createStore({
    liquidityPools: Immutable.Map(),
    liquidityPoolsLoading: false,
    assets: Immutable.Map(),
    lastPoolId: null,
    onGetLiquidityPools(payload) {
        if (!payload) {
            return false;
        }
        this.liquidityPoolsLoading = payload.loading;

        if (payload.liquidityPools) {
            let tmp = Immutable.Map();
            payload.liquidityPools.forEach(pool => {
                tmp = tmp.set(pool.id, pool);
            });
            if (tmp.size === 0) return;
            this.lastPoolId = tmp.last().id;
            this.liquidityPools = this.liquidityPools.merge(tmp);
        }

        if (payload.reset === true) {
            this.lastPoolId = null;
        }
    },
    onGetLiquidityPoolsByShareAsset(payload) {
        if (!payload) {
            return false;
        }
        this.liquidityPoolsLoading = payload.loading;

        if (payload.liquidityPools) {
            let tmp = Immutable.Map();
            payload.liquidityPools.forEach(pool => {
                tmp = tmp.set(pool.id, pool);
            });
            if (tmp.size === 0) return;
            this.lastPoolId = tmp.last().id;
            this.liquidityPools = this.liquidityPools.merge(tmp);
        }

        if (payload.reset === true) {
            this.lastPoolId = null;
        }
    },
    onGetLiquidityPoolsAccount(payload){
        console.log("onGetLiquidityPoolsAccount");
        if (!payload) {
            return false;
        }
        this.liquidityPoolsLoading = payload.loading;

        if (payload.liquidityPools) {
            let tmp = Immutable.Map();
            payload.liquidityPools.forEach(pool => {
                tmp = tmp.set(pool.id, pool);
            });
            if (tmp.size === 0) return;
            this.lastPoolId = tmp.last().id;
            // this.liquidityPools = this.liquidityPools.merge(tmp);
            this.liquidityPools = tmp;
        }

        if (payload.reset === true) {
            this.lastPoolId = null;
        }
    },
    onResetLiquidityPools(payload) {
        this.liquidityPools = Immutable.Map();
    }
});

export const usePoolmartStore = () => [poolmartStore, setPoolmartStore];