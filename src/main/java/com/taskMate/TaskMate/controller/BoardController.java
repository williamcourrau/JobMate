package com.taskMate.TaskMate.controller;

import com.taskMate.TaskMate.dto.BoardResponseDto;
import com.taskMate.TaskMate.dto.CreateBoardRequestDto;
import com.taskMate.TaskMate.service.BoardService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boards")
@AllArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @PostMapping("/create")
    public ResponseEntity<BoardResponseDto> createBoard(@RequestBody CreateBoardRequestDto request,
                                                        @RequestHeader("Authorization") String token){
        return ResponseEntity.ok(boardService.createBoard(request, token));
    }

    @GetMapping
    public ResponseEntity<List<BoardResponseDto>> getUserBoards(@RequestHeader("Authorization") String token){
        return ResponseEntity.ok(boardService.getBoardsForCurrentUser(token));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BoardResponseDto>> getBoardsByUser(@PathVariable Long userId){
        var boards = boardService.getBoardsByUser(userId);
        var response = boards.stream()
                .map(b -> new BoardResponseDto(b.getId(), b.getName(), b.getOwner().getUsername()))
                .toList();

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity<Void> deleteBoard(@PathVariable Long boardId) {
        boardService.deleteBoard(boardId);
        return ResponseEntity.noContent().build();
    }
}
