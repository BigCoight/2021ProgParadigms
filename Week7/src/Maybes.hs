-- | Re-implementation of 'Maybe'-related functions.
module Maybes where

import Data.Maybe()

-- $setup
-- >>> ljust = [Just 1, Just 7, Just 3]
-- >>> lnaught = [Just 3, Nothing, Just 8]

-- | Simple boolean check for 'Maybe' values.
--
-- >>> isJust (Just 1)
-- True
--
-- >>> isJust Nothing
-- False
isJust :: Maybe a -> Bool
isJust Nothing = False
isJust (Just _) = True

-- | Inverse of 'isJust'.
--
-- >>> isNothing (Just 1)
-- False
--
-- >>> isNothing Nothing
-- True
isNothing :: Maybe a -> Bool
isNothing Nothing = True
isNothing (Just _) = False

-- | Extract the value of a 'Just' but return a fallback in case of 'Nothing'.
--
-- >>> fromMaybe (Just 3) 7
-- 3
--
-- >>> fromMaybe Nothing 7
-- 7
fromMaybe :: Maybe a -> a -> a
fromMaybe (Just a) _  = a
fromMaybe Nothing a = a

-- | Gather 'Just' values in a list, filter the 'Nothing'.
--
-- >>> catMaybe ljust
-- [1,7,3]
--
-- >>> catMaybe lnaught
-- [3,8]
catMaybe :: [Maybe a] -> [a]
catMaybe [] = []
catMaybe (Nothing:b) = catMaybe b
catMaybe (Just a:b) = a:(catMaybe b)

