package com.taskMate.TaskMate.service;

import com.taskMate.TaskMate.dto.BoardResponseDto;
import com.taskMate.TaskMate.dto.CreateBoardRequestDto;
import com.taskMate.TaskMate.model.Board;

import java.util.List;
import java.util.Optional;

public interface BoardService {
    BoardResponseDto createBoard(CreateBoardRequestDto createBoardRequestDto, String token);
    List<BoardResponseDto> getBoardsForCurrentUser(String token);
    List<Board> getBoardsByUser(Long userId);
    Optional<Board> getBoardById(Long boardId);
    void deleteBoard(Long boardId);
}
