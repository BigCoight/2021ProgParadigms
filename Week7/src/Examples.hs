{-# LANGUAGE TupleSections #-}

module Examples where

import           Prelude
import           Data.List
import           Data.Ord
import           Data.Function

-- $setup

-- | Sorting a list by length.
--
-- >>> sortList [[1,2,3], [1,2]]
-- [[1,2],[1,2,3]]
sortList :: [[a]] -> [[a]]
sortList a = sortOn length a

-- | Finding the largest list.
--
-- >>> longestList [[1,2,3], [1,2]]
-- [1,2,3]
longestList :: [[a]] -> [a]
longestList a = last (sortList a)

-- | Finding the sumProduct of two lists.
--
-- >>> sumProduct [1,2,3] [1,2,4]
-- 17
sumProduct :: [Int] -> [Int] -> Int
sumProduct a b = sum (zipWith (*) a b)

-- | Group consecutive elements which are equal after applying function
-- 
-- >>> groupEqual id [1,1,1,1,2,2,2,2,2,3,4]
-- [[1,1,1,1],[2,2,2,2,2],[3],[4]]
-- >>> groupEqual (`mod` 5) [5,5,5,5,10,10,10,15,15,15]
-- [[5,5,5,5,10,10,10,15,15,15]]
groupEqual :: Eq b => (a -> b) -> [a] -> [[a]]
groupEqual f a = groupBy ((==) `on` f) a

-- | Apply function to every element in a nested list
--
-- >>> nestedMap (+1) [[1,2,3], [4,5,6], [7,8,9]]
-- [[2,3,4],[5,6,7],[8,9,10]]
nestedMap :: (a -> b) -> [[a]] -> [[b]]
nestedMap f a = map (map f) a

-- | Create a list of tuples from a list and an item.
--
-- >>> zipSingle [1,2,3] 0
-- [(1,0),(2,0),(3,0)]
zipSingle :: [a] -> b -> [(a, b)]
zipSingle a b = zip a (repeat b)
