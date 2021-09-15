-- | Basic game of rock, paper, scissors.
module RockPaperScissors where

-- $setup
-- >>> import Prelude(fst, snd)
-- >>> import Control.Applicative
-- >>> rps = [Rock, Paper, Scissors]
-- >>> combinations = liftA2 (,) rps rps
-- >>> insight f = map (liftA2 f fst snd)

-- | Types for the game choices: rock, paper or scissors.
data RockPaperScissors = Rock | Paper | Scissors

-- | Result of a game: either one player won, or it's a draw.
data Result = Player1 | Player2 | Draw
  deriving(Eq, Show)

-- | A hand should print as:
--
--  * Rock: \"R\"
--  * Paper: \"P\"
--  * Scissors: \"S\"
--
-- >>> map show rps
-- ["R","P","S"]
instance Show RockPaperScissors where
  show Rock = "R"
  show Paper = "P"
  show Scissors = "S"

-- | Equality between members.
--
-- >>> insight (==) combinations
-- [True,False,False,False,True,False,False,False,True]
instance Eq RockPaperScissors where
  Rock == Rock = True
  Paper == Paper = True
  Scissors == Scissors = True
  _ == _ = False

-- | Ordering to determine winning moves.
--
-- >>> insight compare combinations
-- [EQ,LT,GT,GT,EQ,LT,LT,GT,EQ]
instance Ord RockPaperScissors where
  compare Rock Scissors = GT
  compare Scissors Paper = GT
  compare Paper Rock = GT
  compare a b = if a == b then EQ else LT

-- | Tell which player won.
--
-- >>> insight whoWon combinations
-- [Draw,Player2,Player1,Player1,Draw,Player2,Player2,Player1,Draw]
whoWon :: RockPaperScissors -> RockPaperScissors -> Result
whoWon a b
 | a > b = Player1
 | a < b = Player2
 | otherwise = Draw
 
-- | True if the first player has won @n@ or more times.
--
-- >>> competition 2 [Rock, Paper, Paper, Scissors] [Rock, Scissors, Rock, Paper]
-- True
--
-- >>> competition 2 [Paper, Paper, Paper, Scissors] [Rock, Scissors, Rock, Paper]
-- True
--
-- >>> competition 2 [Rock, Paper, Paper, Scissors] [Rock, Scissors, Rock, Scissors]
-- False
--
-- >>> competition 2 [Rock, Paper, Paper, Scissors] [Rock, Scissors, Rock, Rock]
-- False
competition :: Int -> [RockPaperScissors] -> [RockPaperScissors] -> Bool
competition n a b = length (filter (==Player1) (zipWith whoWon a b)) >= n

-- | Generalised competition
--
-- >>> competition' [Rock, Rock, Rock] [Paper, Paper, Paper]
-- Player2
-- >>> competition' [Scissors, Scissors, Scissors] [Paper, Paper, Paper]
-- Player1
-- >>> competition' [Scissors, Scissors, Rock] [Paper, Scissors, Paper]
-- Draw
competition' :: [RockPaperScissors] -> [RockPaperScissors] -> Result
competition' a b = if player1Wins > player2Wins then Player1 else if player1Wins < player2Wins then Player2 else Draw
 where
  player1Wins = length (filter (==Player1) winArr)
  player2Wins = length (filter (==Player2) winArr)
  winArr = zipWith whoWon a b