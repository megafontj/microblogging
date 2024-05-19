<?php

namespace App\Support\QuerySearch;

use Illuminate\Database\Eloquent\Builder;

trait Filterable
{
    public function scopeFilter(Builder $query, SearchQuery $searchQuery): Builder
    {
        return $searchQuery->apply($query, $this->getTable());
    }
}
