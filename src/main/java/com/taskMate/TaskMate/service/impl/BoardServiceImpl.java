package com.taskMate.TaskMate.service.impl;

import com.taskMate.TaskMate.dto.BoardResponseDto;
import com.taskMate.TaskMate.dto.CreateBoardRequestDto;
import com.taskMate.TaskMate.model.Board;
import com.taskMate.TaskMate.model.User;
import com.taskMate.TaskMate.repository.BoardRepository;
import com.taskMate.TaskMate.repository.UserRepository;
import com.taskMate.TaskMate.service.BoardService;
import com.taskMate.TaskMate.service.JwtService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Override
    public BoardResponseDto createBoard(CreateBoardRequestDto createBoardRequestDto, String token) {
        String userEmail = jwtService.extractUserName(token.replace("Bearer ", ""));
        User owner = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Board board = new Board();
        board.setName(createBoardRequestDto.name());
        board.setOwner(owner);
        board.setCreatedAt(LocalDateTime.now());
        board.setUpdatedAt(LocalDateTime.now());

        boardRepository.save(board);

        return new BoardResponseDto(board.getId(), board.getName(), owner.getUsername());
    }

    @Override
    public List<BoardResponseDto> getBoardsForCurrentUser(String token) {
        String userEmail = jwtService.extractUserName(token.replace("Bearer ", ""));
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return boardRepository.findByOwner(user).stream()
                .map(board -> new BoardResponseDto(board.getId(), board.getName(), board.getOwner().getUsername()))
                .toList();
    }

    public List<Board> getBoardsByUser(Long userId) {
        return boardRepository.findByOwnerId(userId);
    }

    public Optional<Board> getBoardById(Long boardId) {
        return boardRepository.findById(boardId);
    }

    public void deleteBoard(Long boardId) {
        boardRepository.deleteById(boardId);
    }
}
