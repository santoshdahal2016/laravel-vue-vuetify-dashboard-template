<?php

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;

use Illuminate\Support\Arr;
use Illuminate\Support\Str;

function full_text_search($original , $search ,$except  ){
    $keys = array_keys($original->toArray()[0]);

    $filtered_keys = Arr::except($keys, $except);

    $collection = $original->filter(function ($item) use($filtered_keys,$search) {
        foreach ($filtered_keys as $key){
            if(Str::contains(str::lower($item[$key]),str::lower($search)) == true){
                return $item ;
            }
        }
    });


    return $collection->values()->all();
}

function paginate($items, $perPage = 15, $page = null, $options = [])
{
    $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);
    $items = $items instanceof Collection ? $items : Collection::make($items);
    return new LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);
}
?>
